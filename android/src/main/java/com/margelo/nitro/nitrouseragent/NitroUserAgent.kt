package com.margelo.nitro.nitrouseragent
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class NitroUserAgent : HybridNitroUserAgentSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}
