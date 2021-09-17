import React, { useState, useEffect, useCallback } from 'react';
import { Portal, Dialog, Paragraph, Button, IconButton, Avatar, Snackbar } from 'react-native-paper';
import { ScrollView, View, Image, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Coins, Chains, Prices, ERC20 } from './Blockchain';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNQRGenerator from 'rn-qr-generator';
import merge from 'deepmerge';
import { styles } from './Components';

const ReceiveQrCodeDialog = props => {
	const [imageUri, setImageUri] = useState();

	useEffect(() => RNQRGenerator.generate({
		value: props.address,
		height: 200,
		width: 200
	}).then(response => {
		const { uri } = response;
		setImageUri(uri);
	}), []);

	const copyAddress = () => {
		Clipboard.setString(props.address);
		props.setSnackbarVisible(true);
	}

	return (
		<Dialog visible={true} onDismiss={props.close}>
			<Dialog.Content
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Paragraph style={{
					marginTop: '5%',
					fontSize: 20,
					textAlign: 'center'
				}}>
					Scan address
				</Paragraph>
				<Paragraph style={{
					fontSize: 20,
					textAlign: 'center'
				}}>
					to receive payment
				</Paragraph>
				<Image
					source={{
						uri: imageUri,
						width: 200,
						height: 200
					}}
					style={{
						marginTop: 15
					}}
				/>
				<Paragraph style={{
					marginTop: '5%',
					textAlign: 'center'
				}}>
					{props.address}
				</Paragraph>
			</Dialog.Content>
			<Dialog.Actions>
				<View style={{ padding: 10, width: '100%' }}>
					<Button
						icon='content-copy'
						size={35}
						style={{
							backgroundColor: '#77a1ee',
							marginBottom: 10
						}}
						onPress={copyAddress}
					>
						copy
					</Button>
					<Button
						mode='contained'
						onPress={props.close}
					>
						done
					</Button>
				</View>
			</Dialog.Actions>
		</Dialog>
	);
}

export const ReceiveTransactionScreen = props => {
}
