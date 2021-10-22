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

/*  @objc func createERC20Transaction(String params, Callback successCallback) throws Exception {
    JSONObject paramsJson = new JSONObject(params)
    let privateKey = wallet.getKeyForCoin(CoinType.ETHEREUM)

    Ethereum.SigningInput signingInput = Ethereum.SigningInput.newBuilder()
      .setChainId(ByteString.copyFrom(new BigInteger("01").toByteArray()))
        .setToAddress(paramsJson.getString("contractTo"))
        .setGasPrice(ByteString.copyFrom((new BigInteger(paramsJson.getString("gasPrice"), 16)).toByteArray()))
        .setGasLimit(ByteString.copyFrom((new BigInteger(paramsJson.getString("gasLimit"), 16)).toByteArray()))
        .setNonce(ByteString.copyFrom(new BigInteger(paramsJson.getString("nonce"), 10).toByteArray()))
        .setTransaction(Ethereum.Transaction.newBuilder()
        .setErc20Transfer(Ethereum.Transaction.ERC20Transfer.newBuilder()
        .setTo(paramsJson.getString("tokenTo"))
        .setAmount(ByteString.copyFrom(new BigInteger(paramsJson.getString("tokenAmount"), 10).toByteArray()))
        .build())
        .build())
        .setPrivateKey(ByteString.copyFrom(privateKey.data()))
        .build();

    Ethereum.SigningOutput signerOutput = AnySigner.sign(signingInput, CoinType.ETHEREUM, Ethereum.SigningOutput.parser());
    successCallback.invoke(toHexString(signerOutput.getEncoded().toByteArray(), true));
  }

  @objc func String toHexString(byte[] byteArray, boolean withPrefix) {
    StringBuilder stringBuilder = new StringBuilder();
    if (withPrefix) {
      stringBuilder.append("0x");
    }
    for (int i = 0; i < byteArray.length; i++) {
      stringBuilder.append(String.format("%02x", byteArray[i]));
    }
    return stringBuilder.toString();
  }*/
}
