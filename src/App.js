import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateOrImportWalletScreen } from './CreateOrImportWalletScreen'
import { CreateWalletScreen } from './CreateWalletScreen'
import { ImportWalletScreen } from './ImportWalletScreen'
import { WalletMainScreen } from './WalletMainScreen'
import { SettingsScreen } from './SettingsScreen'

const Stack = createNativeStackNavigator();

const App = () => {
	const [initialScreen, setInitialScreen] = useState('CreateOrImportWallet');

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
				<Stack.Screen name='CreateWallet' component={CreateWalletScreen} />
				<Stack.Screen name='ImportWallet' component={ImportWalletScreen} />
				<Stack.Screen name='WalletMain' component={WalletMainScreen} />
				<Stack.Screen name='Settings' component={SettingsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
