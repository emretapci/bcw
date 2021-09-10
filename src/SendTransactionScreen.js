import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { styles, CoinItem } from './Components';
import { Text, TextInput, Button } from 'react-native-paper';
import { Coins, Chains, ERC20 } from './Blockchain';
import global from './Global';
import ModalSelector from 'react-native-modal-selector-searchable';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export const SendTransactionScreen = props => {
	return (
		<Stack.Navigator
			initialRouteName='EnterTransactionDetails'
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name='EnterTransactionDetails' component={EnterTransactionDetailsScreen} />
			<Stack.Screen name='ScanQRCode' component={ScanQRCodeScreen} />
		</Stack.Navigator>
	);
}

export const ScanQRCodeScreen = props => {
	return (
		<QRCodeScanner
			onRead={e => props.navigation.navigate({
				name: 'EnterTransactionDetails',
				params: {
					toAddress: e.data,
					merge: true
				}
			})}
			//flashMode={RNCamera.Constants.FlashMode.torch}
			topContent={
				<Text style={{
					fontSize: 18,
					padding: 32,
					flex: 1,
					textAlign: 'center',
					color: 'black'
				}}>
					Scan the QR code for the recipient's address
				</Text >
			}
		/>
	);
}

const EnterTransactionDetailsScreen = props => {
	const [selectedCoinCode, setSelectedCoinCode] = useState();
	const [toAddress, setToAddress] = useState(null);
	const [balance, setBalance] = useState(0);
	const [amount, setAmount] = useState('');

	useEffect(() => {
		setToAddress(props.route.params?.toAddress);
	}, [props.route.params?.toAddress]);

	useEffect(() => {
		selectedCoinCode && ERC20.balanceOf(Coins[selectedCoinCode].address, Chains['Ethereum'].address).then(balance => setBalance(balance));
	}, [selectedCoinCode])

	return (
		<View style={{
			...styles.mainContainer,
			height: null,
			flexDirection: 'column',
			paddingTop: 50,
			paddingLeft: 20
		}}>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<Text style={{
					fontSize: 18,
					width: '20%'
				}}>
					from
				</Text>
				<TextInput
					mode='outlined'
					dense
					disabled={true}
					style={{
						fontSize: 20,
						paddingLeft: 10,
						width: '80%'
					}} >
					{'wallet "' + global.wallet.name + '"'}
				</TextInput>
			</View >
			<View style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<Text style={{
					fontSize: 18,
					width: '20%'
				}}>
					balance
				</Text>
				<TextInput
					mode='outlined'
					dense
					disabled={true}
					style={{
						fontSize: 20,
						paddingLeft: 10,
						flexGrow: 1
					}} >
					{balance}
				</TextInput>
				{selectedCoinCode
					? <Text style={{
						fontSize: 18,
						marginLeft: 10
					}}>
						{selectedCoinCode}
					</Text>
					: null}
			</View >
			<View style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<Text style={{
					fontSize: 18,
					width: '20%'
				}}>
					to
				</Text>
				<TextInput
					mode='outlined'
					dense
					right={!!toAddress
						? <TextInput.Icon name='close-circle-outline' onPress={() => {
							if (props.route.params)
								props.route.params.toAddress = null;
							setToAddress(null);
						}} />
						: <TextInput.Icon name='qrcode' onPress={() => {
							props.navigation.navigate('ScanQRCode');
						}} />}
					style={{
						fontSize: 20,
						paddingLeft: 10,
						width: '80%'
					}}
					value={toAddress}
					onChangeText={text => setToAddress(text)}
				>
				</TextInput>
			</View >
			<View style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<Text style={{
					fontSize: 18,
					width: '20%'
				}}>
					coin
				</Text>
				<View style={{ width: '80%' }}>
					<ModalSelector
						style={{
							marginLeft: 9,
							marginTop: 5,
							height: 43
						}}
						data={Object.keys(Coins).map((coinCode, index) => ({
							key: index,
							label: coinCode,
							component: <CoinItem coin={Coins[coinCode]} />
						}))}
						initValue={selectedCoinCode || 'Tap to select a coin'}
						onChange={option => setSelectedCoinCode(option.label)}
					/>
				</View>
			</View>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<Text style={{
					fontSize: 18,
					width: '20%'
				}}>
					amount
				</Text>
				<TextInput
					mode='outlined'
					dense
					onChangeText={text => setAmount(text)}
					style={{
						fontSize: 20,
						paddingLeft: 10,
						flexGrow: 1
					}} >
				</TextInput>
				{selectedCoinCode
					? <Text style={{
						fontSize: 18,
						marginLeft: 10
					}}>
						{selectedCoinCode}
					</Text>
					: null}
			</View >
			<Button
				mode='contained'
				style={{
					marginTop: 40
				}}
				onPress={() => sendTransaction(toAddress, selectedCoinCode, amount)}
			>
				send
			</Button>
		</View >
	);
}

const sendTransaction = (toAddress, coinCode, tokenAmount) => {
	ERC20.transfer(Coins[coinCode].address, toAddress, tokenAmount).then(res => console.log(res));
}