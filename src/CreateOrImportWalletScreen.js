import React from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';

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
					<Button
						disabled={props.disabled}
						mode={'contained'}
						onPress={() => props.navigation.navigate('ImportWallet')}
						style={{
							width: '100%'
						}}
					>
						import existing wallet
					</Button>
				</View>
				<View style={{ width: '80%' }}>
					<Button
						disabled={props.disabled}
						mode={'outlined'}
						onPress={() => props.navigation.navigate('CreateWallet')}
						style={{
							width: '100%',
							marginTop: 10
						}}
					>
						create a new wallet
					</Button>
				</View>
			</View>
		</View >
	);
}
