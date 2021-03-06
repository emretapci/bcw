#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WalletCore, NSObject)

RCT_EXTERN_METHOD(createWallet:(RCTResponseSenderBlock)successCallback)
RCT_EXTERN_METHOD(importWallet:(NSString *)phrase errorCallback:(RCTResponseSenderBlock)errorCallback successCallback:(RCTResponseSenderBlock)successCallback)
RCT_EXTERN_METHOD(getAddressForCoin:(int)coinCode successCallback:(RCTResponseSenderBlock)successCallback)
RCT_EXTERN_METHOD(createEthTransaction:(NSString *)params successCallback:(RCTResponseSenderBlock)successCallback)
RCT_EXTERN_METHOD(createERC20Transaction:(NSString *)params successCallback:(RCTResponseSenderBlock)successCallback)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
