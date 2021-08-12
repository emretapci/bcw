import React from 'react';
import { View, Image } from 'react-native';
import { BcwButton } from './Components';

export const CreateOrImportWalletScreen = props => {
	return (
		<View>
			<View style={{
				width: '100%',
				height: '70%',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Image source={require('../resources/createImportIcon.png')}
					style={{
						width: '40%',
						height: '33%'
					}} />
			</View>
			<View style={{
				width: '100%',
				height: '30%',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<View style={{ width: '80%' }}>
					<BcwButton emphasis='high' onPress={() => props.navigation.navigate('ImportWallet')}>import existing wallet</BcwButton>
				</View>
				<View style={{ width: '80%' }}>
					<BcwButton emphasis='low' onPress={() => props.navigation.navigate('CreateWallet1')}>create a new wallet</BcwButton>
				</View>
			</View>
		</View >
	);
}
