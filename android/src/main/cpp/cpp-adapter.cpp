#include <jni.h>
#include "nitrouseragentOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitrouseragent::initialize(vm);
}
