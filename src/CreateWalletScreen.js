import React from 'react';

export const CreateWalletScreen = () => {
	return (
		<View>
			<View style={{
				width: wp('100%'),
				height: hp('70%'),
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Image source={require('../resources/createImportIcon.png')}
					style={{
						width: '80%',
						height: '60%'
					}} />
			</View>
			<View style={{
				width: wp('100%'),
				height: hp('30%'),
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<BcwButton emphasis='high' text='import existing wallet' />
				<Separator visible={false} />
				<BcwButton emphasis='low' text='create a new wallet' />
			</View>
		</View >
	);
}
