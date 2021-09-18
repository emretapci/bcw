import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TextInput as MUITextInput, Avatar } from 'react-native-paper';

export const Logo = props => {
	return (
		<View
			style={{
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%'
			}}
		>
			<Image
				source={require('../resources/bitayLogo.png')}
				style={{
					resizeMode: 'contain',
					width: '50%'
				}}
			></Image>
		</View>
	);
}

export const TextInput = props => {
	return (
		<View>
			<MUITextInput
				{...props}
				style={{
					alignSelf: 'center',
					width: '100%',
				}}
				mode='outlined'
				dense
			/>
			{props.error != '' && <Text
				style={{
					alignSelf: 'flex-start',
					paddingLeft: 7,
					color: 'red',
					width: '100%'
				}}
			>
				{props.error}
			</Text>}
		</View>
	)
}

export const Chip = props => {
	const chipInternal = <View
		style={{
			borderWidth: 3,
			borderRadius: 25,
			borderColor: 'gray',
			backgroundColor: 'lightgray',
			margin: 5,
			alignItems: 'flex-start',
			flexDirection: 'row'
		}}
	>
		{props.displayIndex && <Text
			style={{
				textAlign: 'center',
				fontSize: 18,
				paddingLeft: 6,
				paddingRight: 6,
				paddingBottom: 2,
				backgroundColor: 'white',
				borderTopLeftRadius: 25,
				borderBottomLeftRadius: 25
			}}
		>
			{props.number}
		</Text>
		}
		<Text
			style={{
				textAlign: 'center',
				fontSize: 18,
				paddingLeft: 6,
				paddingRight: 6,
				paddingBottom: 2,
				borderLeftWidth: props.displayIndex ? 3 : 0,
				borderLeftColor: 'gray'
			}}
		>
			{props.text}
		</Text>
	</View>

	return (
		props.touchable
			? <TouchableOpacity
				onPress={props.onPress}
				style={{
					alignItems: 'center'
				}}>
				{chipInternal}
			</TouchableOpacity>
			: chipInternal
	);
}

export const Phrase = props => {
	return (
		<View
			style={{
				...{
					alignItems: 'flex-start',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignSelf: 'center'
				},
				...(props.style || {})
			}}
		>
			{
				props.phrase.map((word, i) => <Chip
					onPress={() => props.onPress && props.onPress(word)}
					displayIndex={props.displayIndices}
					text={word}
					number={i + 1}
					key={i + 1}
					touchable={(props.touchable == 'all') ? true : (props.touchable == 'last' ? (i == props.phrase.length - 1) : false)}
				/>)
			}
		</View >
	);
}

export const Warning = props => {
	return (
		<View
			style={{
				...{
					backgroundColor: 'lightcoral',
					padding: 10,
					borderRadius: 5
				},
				...(props.style || {})
			}}
		>
			<Text style={{
				color: 'red',
				textAlign: 'center',
				fontSize: 18
			}}>
				{props.children}
			</Text>
		</View >
	);
}

export const styles = StyleSheet.create({
	mainContainer: {
		alignSelf: 'center',
		width: '90%',
		height: '95%',
		justifyContent: 'flex-start'
	},
	header: {
		textAlign: 'center',
		marginTop: '7%',
		marginBottom: '3%',
		fontSize: 30,
		fontWeight: 'bold'
	},
	subheader: {
		textAlign: 'center',
		marginTop: '4%',
		marginBottom: '5%',
		fontSize: 20
	},
	image: {
		alignSelf: 'center',
		marginTop: '10%'
	}
});
