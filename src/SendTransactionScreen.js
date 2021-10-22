import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { styles } from './Components';
import { Portal, Dialog, Text, TextInput, Button, Paragraph, Avatar } from 'react-native-paper';
import { Coins, Chains, ERC20 } from './Blockchain';
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
			<Stack.Screen name='EnterTransactionDetails' component={EnterTransactionDetailsScreen} initialParams={{ walletName: props.route.params.walletName }} />
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

const TransactionResultDialog = props => {
	return (
		<Dialog visible={true} onDismiss={props.close}>
			<Image source={props.transactionResult.success ? require('../resources/success.png') : require('../resources/failure.png')}
				style={{
					alignSelf: 'center',
					width: 150,
					height: 150,
					marginTop: 50,
					marginBottom: 30
				}} />
			<Dialog.Content>
				<Paragraph style={{ alignSelf: 'center' }}>
					{props.transactionResult.success ? 'Transaction successful.' : 'Transaction failure'}
				</Paragraph>
				{!props.transactionResult.success &&
					<Paragraph style={{ alignSelf: 'center' }}>
						{props.transactionResult.message}
					</Paragraph>
				}
			</Dialog.Content>
			<Dialog.Actions>
				<View style={{ padding: 10, width: '100%' }}>
					<Button
						mode='contained'
						onPress={props.close}
					>
						close
					</Button>
				</View>
			</Dialog.Actions>
		</Dialog >
	);
}

const CoinItem = props =>
	<View
		style={{
			marginBottom: 0,
			marginLeft: 4,
			marginTop: 4,
			flexDirection: 'row',
			alignItems: 'center'
		}}
	>
		<Avatar.Image
			size={props.iconSize}
			source={props.coin.logo}
		/>
		<View
			style={{
				marginLeft: 10,
				marginBottom: 5,
				flexDirection: 'row',
				alignItems: 'center'
			}}>
			<Text style={{ fontSize: 20 }}>{props.coin.code}</Text>
			<Text style={{ marginLeft: 10, fontSize: 14 }}>{props.coin.name}</Text>
		</View>
	</View>

const EnterTransactionDetailsScreen = props => {
	const [selectedCoinCode, setSelectedCoinCode] = useState();
	const [toAddress, setToAddress] = useState(null);
	const [balance, setBalance] = useState(0);
	const [amount, setAmount] = useState('');
	const [transactionResult, setTransactionResult] = useState({ show: false });

	useEffect(() => {
		setToAddress(props.route.params?.toAddress);
	}, [props.route.params?.toAddress]);

	useEffect(() => {
		selectedCoinCode && ERC20.balanceOf(Coins[selectedCoinCode].address, Chains['Ethereum'].address).then(balance => setBalance(balance));
	}, [selectedCoinCode])

	return (
		<Portal.Host>
			<Portal>
				{transactionResult.show && <TransactionResultDialog transactionResult={transactionResult} close={() => {
					setTransactionResult({ show: false });
					if (transactionResult.success) {
						props.navigation.reset({
							index: 0,
							routes: [{ name: 'WalletMain' }]
						})
					}
				}} />}
			</Portal>
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
						{'wallet "' + props.route.params.walletName + '"'}
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
				{selectedCoinCode && <View style={{
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
					<Text style={{
						fontSize: 18,
						marginLeft: 10
					}}>
						{selectedCoinCode}
					</Text>
				</View >
				}
				<Button
					mode='contained'
					style={{
						marginTop: 40
					}}
					onPress={() => sendTransaction(toAddress, selectedCoinCode, amount).then(res => {
						if (res.error)
							setTransactionResult({ show: true, success: false, message: res.error.message });
						else if (res.result)
							setTransactionResult({ show: true, success: true });
					})}
				>
					send
				</Button>
			</View >
		</Portal.Host>
	);
}

const sendTransaction = async (toAddress, coinCode, tokenAmount) => {
	return await ERC20.transfer(Coins[coinCode].address, toAddress, tokenAmount);
}