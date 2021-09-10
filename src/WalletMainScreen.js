import React, { useState, useEffect, useCallback } from 'react';
import { Portal, Dialog, Paragraph, Button, IconButton, Avatar } from 'react-native-paper';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Coins, Chains, Wallet, Prices, Assets } from './Blockchain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNQRGenerator from 'rn-qr-generator';
import merge from 'deepmerge';
import global from './Global';

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
					<Button
						mode='contained'
						onPress={() => setVisible(false)}
					>
						done
					</Button>
				</View>
			</Dialog.Actions>
		</Dialog>
	);
}

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

	return (
		<Dialog visible={true} onDismiss={() => props.setVisible(false)}>
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
						mode='contained'
						onPress={() => props.setVisible(false)}
					>
						done
					</Button>
				</View>
			</Dialog.Actions>
		</Dialog>
	);
}

export const WalletMainScreen = props => {
	const [totalAssetsUSD, setTotalAssetsUSD] = useState(0);
	const [coins, setCoins] = useState(Object.keys(Coins).reduce((prev, cur) => Object.assign(prev, {
		[cur]: {
			code: cur,
			assets: 0
		}
	}), {}));
	const [walletName, setWalletName] = useState('');
	const [favoriteCoins, setFavoriteCoins] = useState([]);
	const [showReceiveQrCodeDialog, setShowReceiveQrCodeDialog] = useState(false);

	useFocusEffect(useCallback(() => {
		AsyncStorage.getItem('favoriteCoins').then(favoriteCoins => setFavoriteCoins(JSON.parse(favoriteCoins || '[]')));

		Wallet.generateAddresses().then(() => console.log('Addresses generated.'));

		const fetchPrices = () => Prices.getPrices().then(prices => setCoins(prev => merge(prev, prices || {})));
		setTimeout(fetchPrices, 0);
		const fetchPricesTimer = setInterval(fetchPrices, 60000);

		AsyncStorage.getItem('walletName').then(walletName => {
			setWalletName(walletName);
			global.wallet.name = walletName;
		});

		return () => {
			clearInterval(fetchPricesTimer);
		}
	}, []));

	return (
		<Portal.Host>
			<Portal>
				{props.route.params && props.route.params.showImportedDialog && <WalletImportedDialog />}
				{showReceiveQrCodeDialog && <ReceiveQrCodeDialog setVisible={setShowReceiveQrCodeDialog} address={Chains['Ethereum'].address} />}
			</Portal>
			<View
				style={{
					alignSelf: 'center',
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexDirection: 'column',
					backgroundColor: 'cornflowerblue',
					width: '90%',
					height: '28%',
					marginTop: '5%',
					borderRadius: 20,
					elevation: 15
				}}>
				<View
					style={{
						width: '100%',
						height: '10%',
						flexDirection: 'row',
						justifyContent: 'flex-end'
					}}
				>
					<TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
						<Avatar.Icon
							icon='cog'
							size={45}
							color='blue'
							style={{
								backgroundColor: null
							}}
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						width: '100%',
						height: '50%',
						flexDirection: 'column',
						alignItems: 'center'
					}}>
					<Text
						style={{
							textAlign: 'center',
							color: 'white',
							fontSize: 40,
							marginTop: '5%'
						}}
					>{'$' + totalAssetsUSD.toFixed(2)}</Text>
					<Text
						style={{
							textAlign: 'center',
							color: 'white',
							fontSize: 14
						}}
					>{walletName}</Text>
				</View>
				<View
					style={{
						width: '70%',
						height: '40%',
						flexDirection: 'row',
						justifyContent: 'space-around'
					}}>
					{[{
						text: 'send',
						icon: 'upload-multiple',
						onPress: () => { props.navigation.navigate('SendTransaction') }
					},
					{
						text: 'receive',
						icon: 'download-multiple',
						onPress: () => setShowReceiveQrCodeDialog(true)
					}].map(button =>
						<View
							key={button.text}
							style={{
								flexDirection: 'column',
								justifyContent: 'space-evenly'
							}}>
							<IconButton
								icon={button.icon}
								size={35}
								color='blue'
								style={{
									backgroundColor: '#77a1ee'
								}}
								onPress={button.onPress}
							/>
							<Text style={{
								textAlign: 'center',
								color: 'blue',
								fontSize: 16,
								marginTop: -15
							}}>{button.text}</Text>
						</View>
					)}
				</View>
			</View>
			<View
				style={{
					alignSelf: 'center',
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexDirection: 'column',
					width: '90%',
					height: '35%',
					marginTop: '5%'
				}}
			>
				{favoriteCoins.map(coinCode => <FavCoinItem key={coinCode} coin={coins[coinCode]} />)}
			</View>
			<Button
				mode='outlined'
				onPress={() => {
					AsyncStorage.removeItem('walletName');
					AsyncStorage.removeItem('phrase');
					AsyncStorage.removeItem('favoriteCoins');
					props.navigation.reset({
						index: 0,
						routes: [{ name: 'CreateOrImportWallet' }]
					});
				}}
				style={{
					alignSelf: 'center',
					marginTop: 100,
					width: '80%'
				}}
			>
				delete wallet
			</Button>
		</Portal.Host>
	);
}

const FavCoinItem = props => {
	return (
		<View
			style={{
				alignSelf: 'center',
				alignItems: 'center',
				justifyContent: 'space-between',
				flexDirection: 'row',
				width: '100%',
				height: '15%',
				backgroundColor: 'cornflowerblue',
				marginTop: '2%',
				borderRadius: 20,
				elevation: 15
			}}>
			<View style={{ flexDirection: 'row' }}>
				<Avatar.Image size={38} source={Coins[props.coin.code].logo} />
				<View
					style={{
						justifyContent: 'flex-start',
						flexDirection: 'column',
						height: '100%',
						marginLeft: 10
					}}>
					<Text
						style={{
							fontSize: 14,
							color: 'blue'
						}}
					>
						{Coins[props.coin.code].name}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start'
						}}>
						<Text
							style={{
								fontSize: 14,
								color: 'blue'
							}}
						>
							{'$' + (props.coin.price || 0).toFixed(2)}
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: props.coin.change ? (props.coin.change > 0 ? 'darkgreen' : (props.coin.change < 0 ? 'red' : 'black')) : 'black',
								marginLeft: 10
							}}
						>
							{(props.coin.change || 0).toFixed(2) + '%'}
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					marginRight: '5%',
					height: '100%',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center'
				}}
			>
				<Text
					style={{
						color: 'white'
					}}
				>
					{(props.coin.assets || 0).toFixed(3) + ' ' + props.coin.code}
				</Text>
			</View>
		</View>
	);
}