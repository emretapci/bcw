import React, { useState, useEffect } from 'react';
import storage from './Store'
import { SafeAreaView, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CreateOrImportWalletScreen } from './CreateOrImportWalletScreen'
import { CreateWalletScreen } from './CreateWalletScreen'
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
	}), []);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
				<Stack.Screen name='CreateOrImportWallet' component={CreateOrImportWalletScreen} />
				<Stack.Screen name='CreateWallet' component={CreateWalletScreen} />
				<Stack.Screen name='ImportWallet' component={ImportWalletScreen} />
				<Stack.Screen name='WalletMain' component={WalletMainScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
