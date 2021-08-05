package com.bcw;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import wallet.core.jni.CoinType;
import wallet.core.jni.HDWallet;
import wallet.core.java.AnySigner;
import wallet.core.jni.proto.Ethereum;
import wallet.core.jni.BitcoinScript;
import wallet.core.jni.BitcoinSigHashType;
import wallet.core.jni.proto.Bitcoin;
import java.math.BigInteger;

public class WalletCoreModule extends ReactContextBaseJavaModule {
    static {
        System.loadLibrary("TrustWalletCore");
    }

    public WalletCoreModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "WalletCore";
    }

    @ReactMethod
    public void sayHi(Callback errorCallback, Callback successCallback) {
        //HDWallet wallet = HDWallet(seedPhrase, passphrase);
    }
}
