import React, { useState, useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './WelcomeScreen';
import { CreateOrImportWalletScreen } from './CreateOrImportWalletScreen';
import { CreateWalletScreen } from './CreateWalletScreen';
import { ImportWalletScreen } from './ImportWalletScreen';
import { WalletMainScreen } from './WalletMainScreen';
import { SettingsScreen } from './SettingsScreen';
import { SendTransactionScreen } from './SendTransactionScreen';
import { ReceiveTransactionScreen } from './ReceiveTransactionScreen';
import { DarkModeContext } from './Context';

const Stack = createNativeStackNavigator();

const App = () => {
	const [darkMode, setDarkMode] = useState();
	const darkModeContextValue = useMemo(() => ({ darkMode, setDarkMode }), [darkMode]);

	return (
		<DarkModeContext.Provider value={darkModeContextValue}>
			<NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
				<Stack.Navigator
					initialRouteName={'Welcome'}
					screenOptions={{
						headerShown: false
					}}>
					<Stack.Screen name='Welcome' component={WelcomeScreen} />
					<Stack.Screen name='CreateOrImportWallet' component={CreateOrImportWalletScreen} />
					<Stack.Screen name='CreateWallet' component={CreateWalletScreen} options={{ title: 'Create wallet' }} />
					<Stack.Screen name='ImportWallet' component={ImportWalletScreen} options={{ title: 'Import wallet' }} />
					<Stack.Screen name='WalletMain' component={WalletMainScreen} />
					<Stack.Screen name='Settings' component={SettingsScreen} options={{ title: 'Settings' }} />
					<Stack.Screen name='SendTransaction' component={SendTransactionScreen} options={{ title: 'Send transaction' }} />
					<Stack.Screen name='ReceiveTransaction' component={ReceiveTransactionScreen} options={{ title: 'Select chain to receive' }} />
				</Stack.Navigator>
			</NavigationContainer>
		</DarkModeContext.Provider>
	);
}

export default App;
