import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wallet } from './Blockchain';
import { View, Image, NativeModules } from 'react-native';
import { DarkModeContext } from './Context';

export const WelcomeScreen = props => {
	const { setDarkMode } = useContext(DarkModeContext);
	const logoScreenInterval = 800;

	useEffect(() => {
		AsyncStorage.multiGet(['darkMode', 'walletName', 'phrase']).then(values => {
			const walletNameElement = values.find(val => val[0] == 'walletName');
			const walletName = walletNameElement && walletNameElement[1];
			const phraseElement = values.find(val => val[0] == 'phrase');
			const phrase = phraseElement && phraseElement[1];
			const darkModeElement = values.find(val => val[0] == 'darkMode');
			const darkMode = darkModeElement && darkModeElement[1];

			setDarkMode(darkMode == 'true');

			if (walletName && phrase && walletName.trim() != '' && phrase.trim().split(/\s+/).length == 12) {
				NativeModules.WalletCore.importWallet(phrase,
					() => AsyncStorage.multiRemove(['walletName', 'phrase']).then(() => {
						setTimeout(() => {
							props.navigation.reset({
								index: 0,
								routes: [{
									name: 'CreateOrImportWallet'
								}]
							});
						}, logoScreenInterval);
					}),
					() => Wallet.generateAddresses().then(() => {
						setTimeout(() => {
							props.navigation.reset({
								index: 0,
								routes: [{
									name: 'WalletMain',
									params: {
										showImportedDialog: false
									}
								}]
							});
						}, logoScreenInterval)
					})
				);
			}
			else {
				AsyncStorage.multiRemove(['walletName', 'phrase']).then(() => setTimeout(() => {
					props.navigation.reset({
						index: 0,
						routes: [{
							name: 'CreateOrImportWallet'
						}]
					});
				}, logoScreenInterval));
			}
		});
	}, []);

	return (
		<View
			style={{
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%'
			}}
		>
			<Image
				source={require('../resources/bitayLogo.png')}
				style={{
					resizeMode: 'contain',
					width: '50%'
				}}
			></Image>
		</View>
	);
}
