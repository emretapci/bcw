import React from 'react';
import { NativeModules } from 'react-native';

const WalletCore = NativeModules.WalletCore;

export const WalletMainScreen = props => {
	return (
		<View>
			<Text>Wallet main</Text>
		</View>
	);
}
