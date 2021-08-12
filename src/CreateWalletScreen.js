import React, { useEffect, useState } from 'react';
import { View, Image, Text, Switch, StyleSheet, NativeModules } from 'react-native';
import { BcwButton, Header, Phrase, Warning } from './Components';
import Clipboard from '@react-native-clipboard/clipboard';
import { Snackbar } from 'react-native-paper';
import RNQRGenerator from 'rn-qr-generator';

const styles = StyleSheet.create({
	mainContainer: {
		alignSelf: 'center',
		width: '90%',
		height: '95%',
		justifyContent: 'flex-start'
	},
	header: {
		textAlign: 'center',
		marginTop: '7%',
		marginBottom: '3%',
		fontSize: 30,
		fontWeight: 'bold'
	},
	subheader: {
		textAlign: 'center',
		marginTop: '4%',
		marginBottom: '5%',
		fontSize: 20
	},
	image: {
		alignSelf: 'center',
		marginTop: '10%'
	}
});

export const CreateWalletScreen1 = props => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.header}>
				Back up you wallet!
			</Text>
			<Text style={styles.subheader}>
				In the next step, you will see 12 words that will allow you to recover your wallet.
			</Text>
			<Image source={require('../resources/backup.png')} style={styles.image} />
			<View
				style={{
					alignItems: 'center',
					flexDirection: 'row',
					marginTop: '20%',
					height: '10%'
				}}
			>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>
				<Text
					style={{
						textAlign: 'left',
						fontSize: 14,
						width: '80%',
						marginLeft: 10
					}}
				>
					I understand that if I lose my recovery phrase, I will never be able to recover my wallet and lose all my assets.
				</Text>
			</View>
			<BcwButton style={{ marginTop: 30 }} enabled={isEnabled} emphasis='high' onPress={isEnabled ? (() => props.navigation.navigate('CreateWallet2')) : null}>create a new wallet</BcwButton>
		</View >
	);
}

export const CreateWalletScreen2 = props => {
	let WalletCore = NativeModules.WalletCore;
	const [phrase, setPhrase] = useState([])
	useEffect(() => WalletCore.createPhrase(phrase => setPhrase(phrase.trim().split(/\s+/))), []);

	const copyPhrase = () => {
		Clipboard.setString(phrase.join(' '));
		setSnackbarVisible(true);
	}

	const [snackbarVisible, setSnackbarVisible] = useState(false);

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.header}>
				Your recovery phrase
			</Text>
			<Text style={styles.subheader}>
				Write down or copy these words in the right order. You will be asked to select them in correct order.
			</Text>
			<Phrase phrase={phrase} />
			<View
				style={{
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'center',
					margin: '5%'
				}}
			>
				<BcwButton style={{ width: '30%' }} onPress={copyPhrase}>copy</BcwButton>
				<BcwButton style={{ width: '30%' }} onPress={() => props.navigation.navigate('CreateWallet3', { phrase })}>show qr</BcwButton>
			</View>
			<Warning style={{ marginTop: '10%' }}>Never share you recovery phrase with anyone and store it securely.</Warning>
			<BcwButton emphasis='high' style={{ marginTop: '10%' }} onPress={() => props.navigation.navigate('CreateWallet3')}>continue</BcwButton>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={1000}
			>
				Phrase copied.
			</Snackbar>
		</View>
	);
}

export const CreateWalletScreen3 = props => {
	const [imageUri, setImageUri] = useState();

	useEffect(() => RNQRGenerator.generate({
		value: props.route.params.phrase.join(' '),
		height: 200,
		width: 200
	}).then(response => {
		const { uri } = response;
		setImageUri(uri);
	})
		.catch(error => console.log('Cannot create QR code', error)),
		[]);

	console.log(props.route);

	return (
		<View style={styles.mainContainer}>
			<View
				style={{
					alignSelf: 'center',
					marginTop: '20%',
					width: 230,
					alignItems: 'center',
					elevation: 10,
					flexDirection: 'column',
					backgroundColor: 'white'
				}}
			>
				<Image
					source={{
						uri: imageUri,
						alignSelf: 'center',
						width: 200,
						height: 200
					}}
					style={{
						marginTop: 15
					}}
				/>
				<Text
					style={{
						marginTop: '5%',
						marginBottom: '5%',
						textAlign: 'center',
						fontSize: 18,
						width: 200
					}}
				>This QR core contains your recovery phrase.</Text>
			</View>
			<Warning style={{
				marginTop: '15%'
			}}>
				Never share you recovery phrase with anyone and store it securely.
			</Warning>
		</View>
	);
}

export const CreateWalletScreen4 = props => {
	return (
		<View>
		</View>
	);
}
