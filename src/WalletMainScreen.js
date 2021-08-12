import React, { useState } from 'react';
import { Portal, Dialog, Paragraph, Headline } from 'react-native-paper';
import { NativeModules, View, Image } from 'react-native';
import { BcwButton } from './Components';

const WalletCore = NativeModules.WalletCore;

const WalletImportedDialog = props => {
	const [visible, setVisible] = useState(true);

	return (
		<Dialog visible={visible} onDismiss={() => setVisible(false)}>
			<Image source={require('../resources/walletImported.png')}
				style={{
					alignSelf: 'center',
					width: 150,
					height: 150,
					marginTop: 50,
					marginBottom: 30
				}} />
			<Dialog.Content>
				<Paragraph style={{ alignSelf: 'center' }}>Your wallet is imported successfully.</Paragraph>
			</Dialog.Content>
			<Dialog.Actions>
				<View style={{ padding: 10, width: '100%' }}>
					<BcwButton emphasis='high' onPress={() => setVisible(false)}>done</BcwButton>
				</View>
			</Dialog.Actions>
		</Dialog>
	);
}

export const WalletMainScreen = props => {

	return (
		<Portal.Host>
			<Portal>
				<WalletImportedDialog />
			</Portal>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'row',
					width: '100%',
					height: '100%'
				}}>
				<Headline style={{ textAlign: 'center', borderWidth: 5, borderColor: 'blue', padding: 10 }}>Wallet main screen</Headline>
			</View>
		</Portal.Host>
	);
}
