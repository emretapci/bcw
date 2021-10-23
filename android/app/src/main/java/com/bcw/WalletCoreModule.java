package com.bcw;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import wallet.core.jni.CoinType;
import wallet.core.jni.HDWallet;
import wallet.core.jni.Mnemonic;
import wallet.core.java.AnySigner;
import wallet.core.jni.proto.Ethereum;
import wallet.core.jni.PrivateKey;
import java.math.BigInteger;
import com.google.protobuf.ByteString;
import com.google.protobuf.Descriptors;

import org.json.JSONObject;

public class WalletCoreModule extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("TrustWalletCore");
    }

    private HDWallet wallet;

    public WalletCoreModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "WalletCore";
    }

    @ReactMethod
    public void createWallet(Callback successCallback) {
        wallet = new HDWallet(128, "");
        successCallback.invoke(null, wallet.mnemonic());
    }

    @ReactMethod
    public void importWallet(String phrase, Callback errorCallback, Callback successCallback) {
        if (!Mnemonic.isValid(phrase)) {
            errorCallback.invoke();
            return;
        }
        wallet = new HDWallet(phrase, "");
        successCallback.invoke();
    }

    @ReactMethod
    public void getAddressForCoin(Integer coinCode, Callback successCallback) {
        String address = wallet.getAddressForCoin(CoinType.createFromValue(coinCode));
        successCallback.invoke(null, address);
    }

    @ReactMethod
    public void createERC20Transaction(String params, Callback successCallback) throws Exception {
        JSONObject paramsJson = new JSONObject(params);

        PrivateKey privateKey = wallet.getKeyForCoin(CoinType.ETHEREUM);

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

    private String toHexString(byte[] byteArray, boolean withPrefix) {
        StringBuilder stringBuilder = new StringBuilder();
        if (withPrefix) {
            stringBuilder.append("0x");
        }
        for (int i = 0; i < byteArray.length; i++) {
            stringBuilder.append(String.format("%02x", byteArray[i]));
        }
        return stringBuilder.toString();
    }
}
