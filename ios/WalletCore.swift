import Foundation
import WalletCore

@objc(WalletCore)
class WalletCore: NSObject {
  var wallet: HDWallet!

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

  @objc func getAddressForCoin(_ coinCode: UInt32, successCallback: RCTResponseSenderBlock) -> Void {
    let address = wallet.getAddressForCoin(coin: CoinType(rawValue: coinCode)!)
    successCallback([NSNull(), address])
  }

  struct ERC20TransactionParams: Decodable {
    var chainId: String
    var contractTo: String
    var gasPrice: String
    var gasLimit: String
    var nonce: String
    var tokenTo: String
    var tokenAmount: String
  }
  
  struct EthTransactionParams: Decodable {
    var chainId: String
    var to: String
    var gasPrice: String
    var gasLimit: String
    var nonce: String
    var weiAmount: String
  }
  
  @objc func createEthTransaction(_ params: String, successCallback: RCTResponseSenderBlock) -> Void {    
    let jsonParams: EthTransactionParams = try! JSONDecoder().decode(EthTransactionParams.self, from: params.data(using: .utf8)!)

    let signingInput = EthereumSigningInput.with {
      $0.chainID = Data(hexString: jsonParams.chainId)!
      $0.toAddress = jsonParams.to
      $0.gasPrice = Data(hexString: jsonParams.gasPrice)!
      $0.gasLimit = Data(hexString: jsonParams.gasLimit)!
      $0.nonce = Data(hexString: jsonParams.nonce)!
      $0.transaction = EthereumTransaction.with {
        $0.transfer = EthereumTransaction.Transfer.with {
          $0.amount = Data(hexString: jsonParams.weiAmount)!
        }
      }
      $0.privateKey = wallet.getKeyForCoin(coin: .ethereum).data
    }

    let output: EthereumSigningOutput = AnySigner.sign(input: signingInput, coin: .ethereum)
    successCallback([NSNull(), output.encoded.hexString])
  }
  
  @objc func createERC20Transaction(_ params: String, successCallback: RCTResponseSenderBlock) -> Void {
    let decoder = JSONDecoder()
    let jsonParams = try! decoder.decode(ERC20TransactionParams.self, from: Data(params.utf8))

    let signingInput = EthereumSigningInput.with {
      $0.chainID = Data(hexString: jsonParams.chainId)!
      $0.toAddress = jsonParams.contractTo
      $0.gasPrice = Data(hexString: jsonParams.gasPrice)!
      $0.gasLimit = Data(hexString: jsonParams.gasPrice)!
      $0.nonce = Data(hexString: jsonParams.nonce)!
      $0.transaction = EthereumTransaction.with {
        $0.erc20Transfer = EthereumTransaction.ERC20Transfer.with {
          $0.amount = Data(hexString: jsonParams.tokenAmount)!
          $0.to = jsonParams.tokenTo
        }
      }
      $0.privateKey = wallet.getKeyForCoin(coin: .ethereum).data
    }
    
    let output: EthereumSigningOutput = AnySigner.sign(input: signingInput, coin: .ethereum)
    successCallback([NSNull(), output.encoded.hexString])
  }
}
