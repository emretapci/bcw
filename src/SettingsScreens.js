import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Portal, Dialog, Avatar, List, Text, Switch, Paragraph, Button } from 'react-native-paper';
import { Coins } from './Blockchain';
import { styles } from './Components';
import merge from 'deepmerge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkModeContext } from './Context';

export const Settings = {
	Main: props => {
		return (
			<>
				<List.Section>
					<List.Item
						title='Wallet'
						style={{ height: 60, paddingTop: 0 }}
						left={() => <List.Icon icon={require('../resources/wallet.png')} />}
						right={() => <List.Icon icon={'chevron-right'} />}
						onPress={() => props.navigation.navigate('Settings.Wallet')}
					/>
					<List.Item
						title='Select favorite coins'
						style={{ height: 60, paddingTop: 0 }}
						left={() => <List.Icon icon={require('../resources/selectFromList.png')} />}
						right={() => <List.Icon icon={'chevron-right'} />}
						onPress={() => props.navigation.navigate('Settings.SelectCoins')}
					/>
					<List.Item
						title='Preferences'
						style={{ height: 60, paddingTop: 0 }}
						left={() => <List.Icon icon={require('../resources/preferences.png')} />}
						right={() => <List.Icon icon={'chevron-right'} />}
						onPress={() => props.navigation.navigate('Settings.Preferences')}
					/>
				</List.Section>
			</>
		);
	},

	WalletScreen: props => {
		const [showDeleteWalletConfirmationDialog, setShowDeleteWalletConfirmationDialog] = useState(false);
		const [showDeleteWalletAcknowledgeDialog, setShowDeleteWalletAcknowledgeDialog] = useState(false);

		const DeleteWalletConfirmationDialog = () => {
			const onYes = () => {
				AsyncStorage.removeItem('walletName');
				AsyncStorage.removeItem('phrase');
				setShowDeleteWalletAcknowledgeDialog(true);
				setShowDeleteWalletConfirmationDialog(false);
			}

			const onCancel = () => {
				setShowDeleteWalletConfirmationDialog(false);
			}

			return (
				<Dialog visible={true} onDismiss={onCancel}>
					<Image source={require('../resources/deleteWallet.png')} style={styles.dialogImage} />
					<Dialog.Content>
						<Paragraph style={styles.dialogContent}>Are you sure that you want to delete your wallet?</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<View style={{ padding: 10, width: '100%' }}>
							<Button
								style={{
									backgroundColor: '#FF8888'
								}}
								mode='outlined'
								onPress={onYes}
							>
								yes, delete!
						</Button>
							<Button
								style={{
									marginTop: 10
								}}
								mode='contained'
								onPress={onCancel}
							>
								cancel
						</Button>
						</View>
					</Dialog.Actions>
				</Dialog>
			);
		}

		const DeleteWalletAcknowledgeDialog = () => {
			const onPress = () => {
				setShowDeleteWalletAcknowledgeDialog(false);
				props.navigation.reset({
					index: 0,
					routes: [{ name: 'CreateOrImportWallet' }]
				});
			}

			return (
				<Dialog visible={true} onDismiss={onPress}>
					<Image source={require('../resources/success.png')} style={styles.dialogImage} />
					<Dialog.Content>
						<Paragraph style={styles.dialogContent}>Your wallet is deleted.</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<View style={{ padding: 10, width: '100%' }}>
							<Button
								mode='contained'
								onPress={onPress}
							>
								ok
						</Button>
						</View>
					</Dialog.Actions>
				</Dialog>
			);
		}

		return (
			<Portal.Host>
				<Portal>
					{showDeleteWalletConfirmationDialog && <DeleteWalletConfirmationDialog />}
					{showDeleteWalletAcknowledgeDialog && <DeleteWalletAcknowledgeDialog />}
				</Portal>
				<ScrollView>
					<List.Section>
						<List.Item
							title='Delete wallet'
							style={{ height: 60, paddingTop: 0 }}
							left={() => <List.Icon icon={require('../resources/deleteWallet.png')} />}
							onPress={() => setShowDeleteWalletConfirmationDialog(true)}
						/>
					</List.Section>
				</ScrollView >
			</Portal.Host>
		);
	},

	PreferencesScreen: () => {
		const { darkMode, setDarkMode } = useContext(DarkModeContext);

		useEffect(() => AsyncStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode]);

		return (
			<ScrollView>
				<List.Section>
					<List.Item
						title='Dark mode'
						style={{ height: 60, paddingTop: 0 }}
						left={() => <List.Icon icon={require('../resources/darkMode.png')} />}
						right={() => <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />}
					/>
					<List.Item
						title='Currency'
						style={styles.listItem}
						left={() => <List.Icon icon={require('../resources/currency.png')} />}
						right={() => <List.Icon icon={'chevron-right'} />}
					/>
				</List.Section>
			</ScrollView >
		);
	},

	SelectCoinsScreen: () => {
		const [coins, setCoins] = useState({});
		const coinsRef = useRef();

		useEffect(() => coinsRef.coins = coins, [coins]);

		useEffect(() => {
			const coins = Object.keys(Coins).reduce((all, code) => merge(all, { [code]: { code, favorite: false } }), {});
			AsyncStorage.getItem('favoriteCoins').then(favoriteCoins => {
				JSON.parse(favoriteCoins || '[]').forEach(favCoinCode => coins[favCoinCode].favorite = true);
				setCoins(coins);
			});

			return () => AsyncStorage.setItem('favoriteCoins', JSON.stringify(Object.keys(coinsRef.coins).filter(coinCode => coinsRef.coins[coinCode].favorite)));
		}, []);

		const enabledChanged = (coinCode, value) => setCoins(prev => merge(prev, { [coinCode]: { favorite: value } }));

		return (
			<ScrollView>
				{Object.keys(coins).map(coinCode => <SelectableCoinItem key={coinCode} enabled={coins[coinCode].favorite} coin={Coins[coinCode]} enabledChanged={enabledChanged} />)}
			</ScrollView >
		);
	}
}

const SelectableCoinItem = props => {
	return <View key={props.coin.code} style={{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 65
	}}>
		<View
			style={{
				marginBottom: 5,
				marginLeft: 5,
				flexDirection: 'row'
			}}
		>
			<Avatar.Image size={50} source={props.coin.logo} style={{ marginRight: 10 }} />
			<View
				style={{
					marginBottom: 5,
					flexDirection: 'column'
				}}>
				<Text style={{ fontSize: 20 }}>{props.coin.code}</Text>
				<Text style={{ fontSize: 14 }}>{props.coin.name}</Text>
			</View>
		</View>
		<View>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={props.enabled ? "#f5dd4b" : "#f4f3f4"}
				ios_backgroundColor="#3e3e3e"
				value={props.enabled}
				onValueChange={value => props.enabledChanged(props.coin.code, value)}
			/>
		</View>
	</View>
}
