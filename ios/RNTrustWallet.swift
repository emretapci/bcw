import Foundation
import WalletCore

@objc(RNTrustWallet)
class RNTrustWallet: NSObject {
  var wallet: HDWallet!

  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(createWallet:) func createWallet(_ successCallback: RCTResponseSenderBlock) -> Void {
    wallet = HDWallet(strength: 128, passphrase: "")
    successCallback([NSNull(), wallet.mnemonic])
  }
}

