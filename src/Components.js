import React from 'react';
import {
	Text,
	View
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const BcwButton = props => {
	return props.emphasis == 'high' ? (
		<TouchableOpacity onPress={props.onPress} style={{
			alignItems: 'center',
			alignSelf: 'center',
			backgroundColor: 'blue',
			padding: 10,
			width: wp('80%')
		}}>
			<Text style={{ color: 'white' }}>{props.text.toUpperCase()}</Text>
		</TouchableOpacity>
	) : (
		<TouchableOpacity onPress={props.onPress} style={{
			alignItems: 'center',
			alignSelf: 'center',
			padding: 10,
			width: wp('80%')
		}}>
			<Text style={{ color: 'blue' }}>{props.text.toUpperCase()}</Text>
		</TouchableOpacity>
	);
}

export const Separator = props => {
	return (
		<View style={{
			alignItems: 'center',
			alignSelf: 'center',
			width: wp('80%'),
			margin: props.visible ? 20 : 10,
			borderColor: 'black',
			borderBottomWidth: props.visible ? 1 : 0
		}} />
	);
}