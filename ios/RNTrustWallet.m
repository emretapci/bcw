#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WalletCore, NSObject)

RCT_EXTERN_METHOD(createWallet:(RCTResponseSenderBlock)successCallback)
RCT_EXTERN_METHOD(importWallet:(NSString *)phrase errorCallback:(RCTResponseSenderBlock)errorCallback successCallback:(RCTResponseSenderBlock)successCallback)

@end
