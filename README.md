# Crypto Wallet React Native application

## Android install

To install on Android device, in `android` directory, run
```
gradlew assembleRelease
```

The install file `app-release.apk` will be in `android/app/build/outputs/apk/` directory. Copy it to the android device, allow installs from unknown sources on the device, and install the apk.

## iOS install

1. Install `Ruby Version Manager` and use ruby version `3.0.2`.

1. In `ios` folder, run `pod install`.

1. Edit `ios/Podfile` as:

   ```
   platform :ios, '13.0'

   ...

   post_install do |installer|
     installer.pods_project.targets.each do |target|
       target.build.configurations.each do |config|
         config.build.settings["ONLY_ACTIVE_ARCH"] = "NO"
         config.build.settings["IPHONEOS_DEPLOYMENT_TARGET"] = "13.0"
       end
     end
     react_native_post_install(installer)
   end
   ```

1. Open project target `bcw`

   Under _Build settings_ > _Architectures_ > _Excluded architectures_, add `arm64`.

   Under _Deployment_, set _iOS Deployment Target_ to `iOS 13.0`.

1. Add `1 ||` to `ios/Pods/Headers/Private/RCT-Folly/folly/portability/Time.h` like:
   ```
   #if 1 || __MACH__ &&                                        \
    (MAC_OS_X_VERSION_MIN_REQUIRED < MAC_OS_X_VERSION_10_12 || \
	__IPHONE_OS_VERSION_MIN_REQUIRED < __IPHONE_10_0)
   ```

1. Install `iOS simulator v13.0`.

1. Run `npx react-native start` and leave the terminal alone.

1. Run `npx react-native run-ios`.
