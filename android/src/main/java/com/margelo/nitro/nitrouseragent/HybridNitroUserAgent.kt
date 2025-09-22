package com.margelo.nitro.nitrouseragent

import android.content.Context
import android.webkit.WebSettings
import android.webkit.WebView
import com.margelo.nitro.core.Promise
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class HybridNitroUserAgent(
  private val appContext: Context
) : HybridNitroUserAgentSpec() {

  override fun getUserAgent(): Promise<String> {
    return Promise.async {
      withContext(Dispatchers.Main) {
        try {
          WebSettings.getDefaultUserAgent(appContext)
        } catch (_: Throwable) {
          val webView = WebView(appContext)
          val ua = webView.settings.userAgentString
          webView.destroy()
          ua
        }
      }
    }
  }
}
