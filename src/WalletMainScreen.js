import React, { useState, useEffect, useCallback } from 'react';
import { Portal, Dialog, Paragraph, Button, IconButton, Avatar } from 'react-native-paper';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Coins, Chains, Wallet, Ethereum } from './Blockchain';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const price = code => {
	return Math.random() * 50000;
}

const change = code => {
	return Math.random() * 10 - 5;
}

export const WalletMainScreen = props => {
	const [totalAssetsUSD, setTotalAssetsUSD] = useState(0);
	const [chains, setChains] = useState(Chains);
	const [coins, setCoins] = useState(Object.keys(Coins).reduce((prev, cur) => Object.assign(prev, { [cur]: { assetsEth: 0 } }), {}));
	const [walletName, setWalletName] = useState('');
	const [favoriteCoins, setFavoriteCoins] = useState([]);

	useFocusEffect(useCallback(() => {
		(async () => {
			AsyncStorage.getItem('walletName').then(walletName => setWalletName(walletName));
			AsyncStorage.getItem('phrase').then(phrase => Wallet.createWallet(phrase));

			await Wallet.generateAddresses();

			const fetchAssets = () => Ethereum.getCoinAssets().then(assetsWei => setCoins(prev => ({ ...prev, ETH: { ...prev.ETH, assetsEth: assetsWei / 1000000000000000000 } })));
			fetchAssets();
			setInterval(fetchAssets, 10000);

			AsyncStorage.getItem('favoriteCoins').then(res => setFavoriteCoins(JSON.parse(res || '[]')));
		})();
	}, []));

	return (
		<Portal.Host>
			{props.route.params && props.route.params.showImportedDialog &&
				<Portal>
					<WalletImportedDialog />
				</Portal>
			}
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
					{[{ text: 'send', icon: 'upload-multiple' }, { text: 'receive', icon: 'download-multiple' }].map(button =>
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
								onPress={() => {
									console.log(button.text);
								}}
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
				{favoriteCoins.map(coinCode => <FavCoinItem key={coinCode} coinCode={coinCode} assetsEth={coins[coinCode].assetsEth} />)}
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
				<Avatar.Image size={38} source={Coins[props.coinCode].logo} />
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
						{Coins[props.coinCode].name}
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
							{'$' + price(props.coinCode).toFixed(2)}
						</Text>
						<Text
							style={{
								fontSize: 14,
								color: 'black',
								marginLeft: 10
							}}
						>
							{(0).toFixed(2) + '%'}
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
					{(props.assetsEth ? props.assetsEth.toFixed(3) : '0.000') + ' ' + Coins[props.coinCode].code}
				</Text>
			</View>
		</View>
	);
}