import Foundation
import WebKit
import NitroModules

private final class UADelegate: NSObject, WKNavigationDelegate {
  let onFinish: () -> Void
  init(onFinish: @escaping () -> Void) { self.onFinish = onFinish }
  func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    onFinish()
  }
}

public final class HybridNitroUserAgent: HybridNitroUserAgentSpec {
  public override init() { super.init() }

  public func getUserAgent() -> Promise<String> {
    return Promise.async {
      let sem = DispatchSemaphore(value: 0)
      var outUA: String?
      var outErr: Error?

      func finish(_ ua: String?, _ err: Error?) {
        outUA = ua
        outErr = err
        sem.signal()
      }

      DispatchQueue.main.async {
        let webView = WKWebView(frame: .zero)

        webView.evaluateJavaScript("navigator.userAgent") { result, error in
          if let error = error {
            finish(nil, error)
            return
          }
          if let ua = result as? String, !ua.isEmpty {
            finish(ua, nil)
            return
          }

          let delegate = UADelegate { [weak webView] in
            webView?.evaluateJavaScript("navigator.userAgent") { result2, error2 in
              if let error2 = error2 {
                finish(nil, error2)
              } else if let ua2 = result2 as? String, !ua2.isEmpty {
                finish(ua2, nil)
              } else {
                finish(nil, NSError(
                  domain: "react-native-nitro-user-agent",
                  code: -2,
                  userInfo: [NSLocalizedDescriptionKey: "navigator.userAgent returned nil"]
                ))
              }
            }
          }
          webView.navigationDelegate = delegate

          webView.loadHTMLString("", baseURL: nil)

          DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
            if outUA == nil && outErr == nil {
              finish(nil, NSError(
                domain: "react-native-nitro-user-agent",
                code: -3,
                userInfo: [NSLocalizedDescriptionKey: "Timed out while reading userAgent"]
              ))
            }
          }
        }
      }

      _ = sem.wait(timeout: .now() + 6)

      if let err = outErr { throw err }
      guard let ua = outUA, !ua.isEmpty else {
        throw NSError(domain: "react-native-nitro-user-agent", code: -2)
      }
      return ua
    }
  }
}
