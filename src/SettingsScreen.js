import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ScrollView } from 'react-native';
import { Avatar, List, Text, Switch } from 'react-native-paper';
import Coins from './coinData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export const SettingsScreen = props => {
	return (
		<Stack.Navigator
			initialRouteName='SettingsMain'
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name='SettingsMain' component={SettingsMainScreen} />
			<Stack.Screen name='SelectCoins' component={SelectCoinsScreen} />
		</Stack.Navigator>
	);
}

const SettingsMainScreen = props => {
	return (
		<>
			<List.Section>
				<List.Item
					title='Select coins'
					left={() => <List.Icon icon='tune' />}
					onPress={() => props.navigation.navigate('SelectCoins')}
				/>
			</List.Section>
		</>
	);
}

const SelectCoinsScreen = props => {
	const [favoriteCoins, setFavoriteCoins] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('favoriteCoins').then(res => {
			setFavoriteCoins(JSON.parse(res || '[]'));
		});
	}, []);

	return (
		<ScrollView>
			<List.Section>
				{
					Coins.map(coin => {
						const isEnabled = favoriteCoins.indexOf(coin.code) >= 0;
						return <View
							key={coin.code}
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}
						>
							<View
								style={{
									marginBottom: 5,
									marginLeft: 5,
									flexDirection: 'row'
								}}
							>
								<Avatar.Image size={50} source={coin.logo} style={{ marginRight: 10 }} />
								<View
									style={{
										marginBottom: 5,
										flexDirection: 'column'
									}}>
									<Text style={{ fontSize: 20 }}>{coin.code}</Text>
									<Text style={{ fontSize: 14 }}>{coin.name}</Text>
								</View>
							</View>
							<View>
								<Switch
									trackColor={{ false: "#767577", true: "#81b0ff" }}
									thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
									ios_backgroundColor="#3e3e3e"
									onValueChange={() => setFavoriteCoins(prev => {
										let ret;
										if (prev.indexOf(coin.code) >= 0)
											ret = prev.filter(c => c != coin.code)
										else
											ret = [...prev, coin.code];
										AsyncStorage.setItem('favoriteCoins', JSON.stringify(ret));
										return ret;
									})}
									value={isEnabled}
								/>
							</View>
						</View>
					})
				}
			</List.Section>
		</ScrollView >
	);
}

