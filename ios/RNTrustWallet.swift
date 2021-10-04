import Foundation
import WalletCore

@objc(WalletCore)
class WalletCore: NSObject {
  var wallet: HDWallet!

  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc func createWallet(_ successCallback: RCTResponseSenderBlock) -> Void {
    wallet = HDWallet(strength: 128, passphrase: "")
    successCallback([NSNull(), wallet.mnemonic])
  }

  @objc func importWallet(_ phrase: String, errorCallback: RCTResponseSenderBlock, successCallback: RCTResponseSenderBlock) -> Void {
    if (!Mnemonic.isValid(mnemonic: phrase)) {
      errorCallback([NSNull(), NSNull()])
      return
    }
    wallet = HDWallet(mnemonic: phrase, passphrase: "")
    successCallback([NSNull(), NSNull()])
  }

  @objc func test(_ param1: String, func: RCTResponseSenderBlock) -> Void {
  }
}
