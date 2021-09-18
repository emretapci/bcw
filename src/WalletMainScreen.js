import React, { useState, useEffect, useCallback } from 'react';
import { Portal, Dialog, Paragraph, Button, IconButton, Avatar, Snackbar } from 'react-native-paper';
import { View, Image, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Coins, Chains, Prices, ERC20 } from './Blockchain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import merge from 'deepmerge';
import { CoinList, styles } from './Components';

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
						height: '10%',
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<IconButton icon='refresh' size={35} color='blue' style={{ backgroundColor: null }} onPress={fetchValues} />
					<IconButton icon='cog' size={35} color='blue' style={{ backgroundColor: null }} onPress={() => props.navigation.navigate('Settings')} />
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
			<CoinList coins={favoriteCoinCodes.map(code => merge(coins[code], { name: Coins[code].name, logo: Coins[code].logo }))} displayPrice />
		</Portal.Host>
	);
}