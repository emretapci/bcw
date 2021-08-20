import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, Text, Switch, NativeModules } from 'react-native';
import { Snackbar, Button } from 'react-native-paper';
import { Phrase, Warning, TextInput, styles } from './Components';
import Clipboard from '@react-native-clipboard/clipboard';
import { messages } from './Util';
import RNQRGenerator from 'rn-qr-generator';

const Stack = createNativeStackNavigator();

export const CreateWalletScreen = props => {
	return (
		<Stack.Navigator
			initialRouteName='CreateWallet1'
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name='CreateWallet1' component={CreateWalletScreen1} />
			<Stack.Screen name='CreateWallet2' component={CreateWalletScreen2} />
			<Stack.Screen name='CreateWallet3' component={CreateWalletScreen3} />
			<Stack.Screen name='CreateWallet4' component={CreateWalletScreen4} />
			<Stack.Screen name='CreateWallet5' component={CreateWalletScreen5} />
		</Stack.Navigator>
	);
}

const CreateWalletScreen1 = props => {
	const [isEnabled, setIsEnabled] = useState(false);
	const [phrase, setPhrase] = useState('not set');
	const [phraseCreated, setPhraseCreated] = useState(false);

	let WalletCore = NativeModules.WalletCore;

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	useEffect(() => WalletCore.createPhrase(phrase => {
		setPhrase(phrase.trim().split(/\s+/));
	}), []);

	useEffect(() => {
		if (Array.isArray(phrase) && phrase.length == 12)
			setPhraseCreated(true);
		else if (phrase != 'not set') {
			console.log('wallet-core error: Cannot create BIP39 phrase.');
		}
	}, [phrase]);

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
			<Button
				disabled={!isEnabled || !phraseCreated}
				mode={'contained'}
				onPress={() => props.navigation.navigate('CreateWallet2', { phrase })}
				style={{ marginTop: 30, width: '100%' }}
			>
				create a new wallet
			</Button>
		</View >
	);
}

const CreateWalletScreen2 = props => {
	const copyPhrase = () => {
		Clipboard.setString(props.route.params.phrase.join(' '));
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
			<Phrase displayIndices={true} phrase={props.route.params.phrase} />
			<View
				style={{
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'center',
					margin: '5%'
				}}
			>
				<Button
					icon='content-copy'
					size={35}
					style={{
						backgroundColor: '#77a1ee'
					}}
					onPress={copyPhrase}
				>
					copy
				</Button>
				<Button
					icon='qrcode'
					size={35}
					style={{
						marginLeft: 20,
						backgroundColor: '#77a1ee'
					}}
					onPress={() => props.navigation.navigate('CreateWallet3', { phrase: props.route.params.phrase })}
				>
					show qr
				</Button>
			</View>
			<Warning style={{ marginTop: '10%' }}>Never share you recovery phrase with anyone and store it securely.</Warning>
			<Button
				mode='contained'
				onPress={() => props.navigation.navigate('CreateWallet4', { phrase: props.route.params.phrase })}
				style={{ marginTop: '10%' }}
			>
				continue
			</Button>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={1000}
			>
				Phrase copied.
			</Snackbar>
		</View >
	);
}

const CreateWalletScreen3 = props => {
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
				<Text style={styles.subheader}>
					This QR core contains your recovery phrase.
				</Text>
			</View>
			<Warning style={{
				marginTop: '15%'
			}}>
				Never share you recovery phrase with anyone and store it securely.
			</Warning>
			<Button
				mode='contained'
				onPress={() => props.navigation.goBack()}
				style={{ marginTop: '10%' }}
			>
				back
			</Button>
		</View>
	);
}

const CreateWalletScreen4 = props => {
	const [allWords, setAllWords] = useState(props.route.params.phrase.map((word, index) => ({ word, index, selected: false })).sort(() => (Math.random() > .5) ? 1 : -1));
	const [selectedWords, setSelectedWords] = useState([]);
	const [correctPhrase, setCorrectPhrase] = useState(true);
	const [displayWarning, setDisplayWarning] = useState(false);

	useEffect(() => {
		if (selectedWords.length == 0) {
			setCorrectPhrase(false);
			setDisplayWarning(false);
			return;
		}

		for (let i = 0; i < selectedWords.length; i++) {
			if (selectedWords[i] != props.route.params.phrase[i]) {
				setCorrectPhrase(false);
				setDisplayWarning(true);
				return;
			}
		}

		if (selectedWords.length == props.route.params.phrase.length) {
			setCorrectPhrase(true);
		}

		setDisplayWarning(false);
	}, [selectedWords]);

	return (
		<>
			<View
				style={{
					...styles.mainContainer,
					height: null,
					flexDirection: 'column'
				}}>
				<Text style={styles.header}>
					Verify recovery phrase
				</Text>
				<Text style={styles.subheader}>
					Select the words below in the correct order
				</Text>
			</View>
			<View
				style={{
					alignSelf: 'center',
					marginTop: '3%',
					width: '100%',
					height: '24%',
					alignItems: 'center',
					elevation: 10,
					flexDirection: 'column',
					backgroundColor: 'white'
				}}
			>
				<Phrase
					style={{ marginTop: '2%' }}
					displayIndices={true}
					phrase={selectedWords}
					touchable={!correctPhrase && 'all'}
					onPress={unselectedWord => {
						setAllWords(prev => {
							prev.filter(obj => obj.word == unselectedWord)[0].selected = false;
							return prev;
						});
						setSelectedWords(prev => prev.filter(word => word != unselectedWord));
					}}
				/>
			</View>
			<View
				style={{
					alignSelf: 'center',
					width: '100%',
					height: '29%',
					alignItems: 'center',
					flexDirection: 'column'
				}}
			>
				<Phrase
					style={{ marginTop: '5%' }}
					displayIndices={false}
					phrase={allWords.filter(obj => !obj.selected).map(obj => obj.word)}
					onPress={selectedWord => {
						setSelectedWords(prev => [...prev, selectedWord]);
						setAllWords(prev => {
							prev.filter(obj => obj.word == selectedWord)[0].selected = true;
							return prev;
						});
					}}
					touchable='all'
				/>
			</View>
			<View style={{
				...styles.mainContainer,
				height: '10%'
			}}>
				{displayWarning && <Warning>Invalid order. Please take a note of your recovery phrase.</Warning>}
			</View>
			<View style={{
				...styles.mainContainer,
				marginTop: '5%',
				height: '10%'
			}}>
				<Button
					disabled={!correctPhrase}
					mode='contained'
					onPress={() => props.navigation.navigate('CreateWallet5', { phrase: props.route.params.phrase })}
					style={{ marginTop: '10%' }}
				>
					continue
				</Button>
			</View>
		</>
	);
}

const CreateWalletScreen5 = props => {
	const [walletName, setWalletName] = useState('');
	const [walletNameInError, setWalletNameInError] = useState('');

	const createWallet = () => {
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

		if (hasError)
			return;

		AsyncStorage.setItem('walletName', walletName);
		AsyncStorage.setItem('phrase', props.route.params.phrase.join(' '));

		props.navigation.reset({
			index: 0,
			routes: [{ name: 'WalletMain' }]
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
				<Button
					mode='contained'
					onPress={createWallet}
				>
					continue
				</Button>
			</View>
		</View>
	);
}
