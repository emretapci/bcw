import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, NativeModules } from 'react-native';
import { Button } from 'react-native-paper';
import { Logo } from './Components';
import { useEffect } from 'react';

export const CreateOrImportWalletScreen = props => {
	const [showLogo, setShowLogo] = useState(true);

	const logoScreenInterval = 1000;

	useEffect(async () => {
		const walletName = await AsyncStorage.getItem('walletName');
		const phrase = await AsyncStorage.getItem('phrase');

		if (walletName && phrase && walletName.trim() != '' && phrase.trim().split(/\s+/).length == 12) {
			const WalletCore = NativeModules.WalletCore;
			WalletCore.createWallet(phrase);
			setTimeout(() => {
				props.navigation.reset({
					index: 0,
					routes: [{ name: 'WalletMain' }]
				});
			}, logoScreenInterval);
		}
		else {
			setTimeout(() => {
				setShowLogo(false);
			}, logoScreenInterval);
		}
	}, []);

	return (showLogo
		? <Logo />
		: <View>
			<View style={{
				width: '100%',
				height: '70%',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Image source={require('../resources/createImportIcon.png')}
					style={{
						width: '40%',
						height: '33%'
					}} />
			</View>
			<View style={{
				width: '100%',
				height: '30%',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<View style={{ width: '80%' }}>
					<Button
						disabled={props.disabled}
						mode={'contained'}
						onPress={() => props.navigation.navigate('ImportWallet')}
						style={{
							width: '100%'
						}}
					>
						import existing wallet
					</Button>
				</View>
				<View style={{ width: '80%' }}>
					<Button
						disabled={props.disabled}
						mode={'outlined'}
						onPress={() => props.navigation.navigate('CreateWallet')}
						style={{
							width: '100%',
							marginTop: 10
						}}
					>
						create a new wallet
					</Button>
				</View>
			</View>
		</View >
	);
}
