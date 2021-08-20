import React, { useState, useEffect, useCallback } from 'react';
import { Portal, Dialog, Paragraph, Button, IconButton, Avatar } from 'react-native-paper';
import { NativeModules, View, Image, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Coins from './coinData';
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

const assets = code => {
	return Math.random() * 10;
}

export const WalletMainScreen = props => {

	const [totalAssetsUSD, setTotalAssetsUSD] = useState(0);
	const [chainAddresses, setChainAddresses] = useState([]);
	const [walletName, setWalletName] = useState('');
	const [phrase, setPhrase] = useState('');
	const [favoriteCoins, setFavoriteCoins] = useState([]);

	useFocusEffect(useCallback(() => {
		AsyncStorage.getItem('walletName').then(walletName => setWalletName(walletName)).catch(err => console.log(err));
		AsyncStorage.getItem('phrase').then(phrase => {
			setPhrase(phrase);
			const WalletCore = NativeModules.WalletCore;
			WalletCore.createWallet(phrase);
		}).catch(err => console.log(err));

		/*Object.keys(Chains).forEach(chain => {
			WalletCore.getAddressForCoin(Chains[chain], address => {
				setChainAddresses(prev => Object.assign(prev, { chain, address }));
			});
		});*/

		AsyncStorage.getItem('favoriteCoins').then(res => setFavoriteCoins(JSON.parse(res || '[]')));
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
					height: '35%',
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
							marginTop: 30
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
				{favoriteCoins.map(coinCode => {
					const coin = Coins.filter(c => c.code == coinCode)[0];
					const coinChange = change(coinCode);
					return <View
						key={coinCode}
						style={{
							alignSelf: 'center',
							alignItems: 'center',
							justifyContent: 'flex-start',
							flexDirection: 'row',
							width: '100%',
							height: '15%',
							backgroundColor: 'cornflowerblue',
							marginTop: '2%',
							borderRadius: 20,
							elevation: 15
						}}>
						<Avatar.Image size={38} source={coin.logo} />
						<View
							style={{
								justifyContent: 'flex-start',
								flexDirection: 'column',
								width: '50%',
								height: '100%',
								marginLeft: 10
							}}>
							<Text
								style={{
									fontSize: 14,
									color: 'blue'
								}}
							>
								{coin.name}
							</Text>
							<View
								style={{
									justifyContent: 'flex-start',
									flexDirection: 'row',
									width: '50%',
									height: '100%'
								}}>
								<Text
									style={{
										fontSize: 14,
										color: 'blue'
									}}
								>
									{'$' + price(coin.code).toFixed(2)}
								</Text>
								<Text
									style={{
										fontSize: 14,
										color: coinChange > 0 ? 'green' : (coinChange < 0 ? 'red' : 'black'),
										marginLeft: 10
									}}
								>
									{coinChange.toFixed(2) + '%'}
								</Text>
							</View>
						</View>
						<View
							style={{
								marginLeft: '10%',
								width: '30%',
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
								{assets(coinCode).toFixed(3) + ' ' + coinCode}
							</Text>
						</View>
					</View>
				})}
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
