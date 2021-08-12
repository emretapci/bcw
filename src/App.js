import React, { useState, useEffect } from 'react';
import storage from './Store'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateOrImportWalletScreen } from './CreateOrImportWalletScreen'
import { CreateWalletScreen1, CreateWalletScreen2, CreateWalletScreen3, CreateWalletScreen4 } from './CreateWalletScreen'
import { ImportWalletScreen } from './ImportWalletScreen'
import { WalletMainScreen } from './WalletMainScreen'

const Stack = createNativeStackNavigator();

const App = () => {
	const [initialScreen, setInitialScreen] = useState('CreateOrImportWallet');

	useEffect(() => storage.load({
		key: 'wallet',
		autoSync: false
	}).then(ret => {
		setInitialScreen('WalletMain');
	}).catch(err => {
	}), []);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={initialScreen}
				screenOptions={{
					headerShown: false,
					cardStyle: {
						backgroundColor: 'red'
					}
				}}>
				<Stack.Screen name='CreateOrImportWallet' component={CreateOrImportWalletScreen} />
				<Stack.Screen name='CreateWallet1' component={CreateWalletScreen1} />
				<Stack.Screen name='CreateWallet2' component={CreateWalletScreen2} />
				<Stack.Screen name='CreateWallet3' component={CreateWalletScreen3} />
				<Stack.Screen name='CreateWallet4' component={CreateWalletScreen4} />
				<Stack.Screen name='ImportWallet' component={ImportWalletScreen} />
				<Stack.Screen name='WalletMain' component={WalletMainScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
