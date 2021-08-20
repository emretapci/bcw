import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, NativeModules } from 'react-native';
import { Button } from 'react-native-paper';
import { TextInput } from './Components';
import { messages } from './Util';

let WalletCore = NativeModules.WalletCore;

export const ImportWalletScreen = props => {
	const [walletName, setWalletName] = useState('');
	const [phrase, setPhrase] = useState('');
	const [walletNameInError, setWalletNameInError] = useState('');
	const [phraseInError, setPhraseInError] = useState('');

	const importWallet = () => {
		let hasError = false;
		if (walletName.trim() == '') {
			setWalletNameInError(messages['required']);
			hasError = true;
		}
		else if (!/[A-Za-z0-9\s]+/.test(walletName)) {
			setWalletNameInError(messages['error']);
			hasError = true;
		}
		else
			setWalletNameInError('');
		if (phrase.trim() == '') {
			setPhraseInError(messages['required']);
			hasError = true;
		}
		else if (!/^\s*([A-Za-z]+\s+){11,11}[A-Za-z]+\s*$/.test(phrase)) {
			setPhraseInError(messages['error']);
			hasError = true;
		}
		else
			setPhraseInError('');

		if (hasError)
			return;

		WalletCore.importWallet(phrase, () => {
			setPhraseInError(messages['invalidPhrase']);
		}, () => {
			AsyncStorage.setItem('walletName', walletName);
			AsyncStorage.setItem('phrase', phrase);
			props.navigation.reset({
				index: 0,
				routes: [{
					name: 'WalletMain',
					params: { showImportedDialog: true }
				}]
			});
		});
	}

	return (
		<View>
			<View style={{
				alignSelf: 'center',
				width: '80%'
			}}
			>
				<View style={{ marginTop: '10%', marginBottom: '5%' }}>
					<TextInput
						label='wallet name'
						outlineColor='black'
						error={walletNameInError}
						onChangeText={text => setWalletName(text)}
					/>
				</View>
				<View style={{ marginTop: '5%', marginBottom: '10%' }}>
					<TextInput
						label='phrase'
						outlineColor='black'
						error={phraseInError}
						onChangeText={text => setPhrase(text)}
						multiline
						numberOfLines={5}
					/>
					<Text
						style={{
							alignSelf: 'center',
							marginTop: 5,
							color: 'blue'
						}}
					>
						Your 12 or 24 word BIP39 phrase separated by spaces
					</Text>
				</View>
				<Button
					mode='contained'
					onPress={importWallet}
				>
					import
				</Button>
			</View>
		</View>
	);
}
