import React, { useState, useEffect, useCallback } from 'react';
import { Portal, Dialog, Paragraph, Button, IconButton, Avatar } from 'react-native-paper';
import { View, Image, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Coins, Chains, Prices, ERC20 } from './Blockchain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import merge from 'deepmerge';
import { styles } from './Components';

const WalletImportedDialog = props => {
	return (
		<Dialog visible={true} onDismiss={props.close}>
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
						onPress={props.close}
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
	const [walletName, setWalletName] = useState('');
	const [favoriteCoinCodes, setFavoriteCoinCodes] = useState([]);
	const [coins, setCoins] = useState({});
	const [showWalletImportedDialog, setShowWalletImportedDialog] = useState(props.route.params?.showImportedDialog);

	useEffect(() => setCoins(Object.keys(Coins).reduce((all, code) => merge(all, { [code]: { code, price: { value: 0, change: 0 } } }), {})), []);

	const fetchValues = () => {
		Prices.getPrices().then(prices => setCoins(prev => merge(prev, prices)));

		//Fetch ERC20 token assets
		const ethAddress = Chains['Ethereum'].address;
		const erc20Codes = Object.keys(Coins).filter(code => Coins[code].chain == 'Ethereum' && !Coins[code].isNative);
		Promise.all(erc20Codes.map(code => ERC20.balanceOf(Coins[code].address, ethAddress))).then(balances => {
			setCoins(prev => {
				let newCoins = {};
				for (let i = 0; i < erc20Codes.length; i++)
					newCoins[erc20Codes[i]] = { balance: balances[i] };
				return merge(prev, newCoins);
			});
		});
	}

	useEffect(() => {
		setTotalAssetsUSD(Object.keys(coins).reduce((all, code) => all + (coins[code].price?.value || 0) * (coins[code].balance || 0), 0));
	}, [coins])

	useFocusEffect(useCallback(() => {
		AsyncStorage.getItem('favoriteCoins').then(favoriteCoinCodesStr => setFavoriteCoinCodes(JSON.parse(favoriteCoinCodesStr || '[]')));
		AsyncStorage.getItem('walletName').then(walletName => setWalletName(walletName));
	}, []));

	useEffect(fetchValues, [favoriteCoinCodes]);

	return (
		<Portal.Host>
			<Portal>
				{showWalletImportedDialog &&
					<WalletImportedDialog
						close={() => setShowWalletImportedDialog(false)}
					/>
				}
			</Portal>
			<View
				style={styles.mainSummary}>
				<View
					style={{
						width: '100%',
						height: 60,
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<IconButton icon='refresh' size={35} color='blue' style={{ backgroundColor: null }} onPress={fetchValues} />
					<IconButton icon='cog' size={35} color='blue' style={{ backgroundColor: null }} onPress={() => props.navigation.navigate('Settings.Main')} />
				</View>
				<View
					style={{
						width: '100%',
						height: 100,
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
						width: '50%',
						height: 80,
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}>
					{[{
						text: 'send',
						icon: 'upload-multiple',
						onPress: () => props.navigation.navigate('SendTransaction', { walletName })
					},
					{
						text: 'receive',
						icon: 'download-multiple',
						onPress: () => props.navigation.navigate('ReceiveTransaction')
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
			<ScrollView
				contentContainerStyle={{
					alignItems: 'center',
					justifyContext: 'flex-start'
				}}
			>
				{favoriteCoinCodes.map(code => merge(coins[code], { name: Coins[code].name, logo: Coins[code].logo })).map(coin =>
					<FavoriteCoinItem key={coin.code} coin={coin} displayPrice={true} />)}
			</ScrollView>
		</Portal.Host>
	);
}

const FavoriteCoinItem = props => {
	return (
		<View style={styles.coinItem}>
			<View style={{ flexDirection: 'row', marginLeft: 10 }}>
				<Avatar.Image size={38} source={props.coin.logo} />
				<View
					style={{
						justifyContent: 'flex-start',
						flexDirection: 'column',
						height: '100%',
						marginLeft: 10
					}}>
					<Text
						style={{
							fontSize: props.displayPrice ? 14 : 18,
							color: 'black'
						}}
					>
						{props.coin.name}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start'
						}}>
						{props.displayPrice && <>
							<Text
								style={{
									fontSize: 14,
									color: 'gray'
								}}
							>
								{'$' + (props.coin.price.value || 0).toFixed(2)}
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: props.coin.price?.change ? (props.coin.price?.change > 0 ? 'darkgreen' : (props.coin.price?.change < 0 ? 'red' : 'black')) : 'black',
									marginLeft: 10
								}}
							>
								{(props.coin.price.change || 0).toFixed(2) + '%'}
							</Text>
						</>}
					</View>
				</View>
			</View>
			<View
				style={{
					marginRight: 10,
					height: '100%',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center'
				}}
			>
				<Text
					style={{
						fontSize: 18,
						color: 'black'
					}}
				>
					{(props.coin.balance || 0).toFixed(3) + ' ' + props.coin.code}
				</Text>
			</View>
		</View>
	);
}
