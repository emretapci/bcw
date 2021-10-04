import React, { useState, useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from './WelcomeScreen';
import { CreateOrImportWalletScreen } from './CreateOrImportWalletScreen';
import { CreateWalletScreen } from './CreateWalletScreen';
import { ImportWalletScreen } from './ImportWalletScreen';
import { WalletMainScreen } from './WalletMainScreen';
import { SettingsScreen } from './SettingsScreens';
import { SendTransactionScreen } from './SendTransactionScreen';
import { ReceiveTransactionScreen } from './ReceiveTransactionScreen';
import { DarkModeContext } from './Context';
import { Settings } from './SettingsScreens';
import { CreateWallet } from './CreateWalletScreens';

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
						headerStyle: { backgroundColor: 'cornflowerblue' }
					}}>
					<Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
					<Stack.Screen name='CreateOrImportWallet' component={CreateOrImportWalletScreen} />
					<Stack.Screen name='CreateWallet.Main' component={CreateWallet.Main} options={{ title: 'Create wallet' }} />
					<Stack.Screen name='CreateWallet.Screen1' component={CreateWallet.Screen1} options={{ title: 'Recovery phrase' }} />
					<Stack.Screen name='CreateWallet.Screen2' component={CreateWallet.Screen2} options={{ title: 'QR code' }} />
					<Stack.Screen name='CreateWallet.Screen3' component={CreateWallet.Screen3} options={{ title: 'Verify' }} />
					<Stack.Screen name='CreateWallet.Screen4' component={CreateWallet.Screen4} options={{ title: 'Create wallet' }} />
					<Stack.Screen name='ImportWallet' component={ImportWalletScreen} options={{ title: 'Import wallet' }} />
					<Stack.Screen name='WalletMain' component={WalletMainScreen} options={{ headerShown: false }} />
					<Stack.Screen name='SendTransaction' component={SendTransactionScreen} options={{ title: 'Send transaction' }} />
					<Stack.Screen name='ReceiveTransaction' component={ReceiveTransactionScreen} options={{ title: 'Select chain to receive' }} />
					<Stack.Screen name='Settings.Main' component={Settings.Main} options={{ title: 'Settings' }} />
					<Stack.Screen name='Settings.SelectCoins' component={Settings.SelectCoinsScreen} options={{ title: 'Select favorite coins' }} />
					<Stack.Screen name='Settings.Wallet' component={Settings.WalletScreen} options={{ title: 'Wallet' }} />
					<Stack.Screen name='Settings.Preferences' component={Settings.PreferencesScreen} options={{ title: 'Preferences' }} />
				</Stack.Navigator>
			</NavigationContainer>
		</DarkModeContext.Provider>
	);
}

export default App;
