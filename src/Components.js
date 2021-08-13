import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput as MUITextInput } from 'react-native-paper';

export const BcwButton = props => {
	let enabled = props.hasOwnProperty('enabled') ? props.enabled : true;
	return (
		enabled ? <TouchableOpacity
			onPress={props.onPress}
			style={{
				...{
					alignItems: 'center',
					alignSelf: 'center',
					backgroundColor: props.emphasis == 'high' ? 'blue' : null,
					padding: 10,
					width: '100%'
				},
				...(props.style || {})
			}}>
			<Text style={{ color: props.emphasis == 'high' ? 'white' : 'blue' }}>{(props.children || '').toUpperCase()}</Text>
		</TouchableOpacity>
			: <View
				style={{
					...{
						alignItems: 'center',
						alignSelf: 'center',
						backgroundColor: props.emphasis == 'high' ? 'cornflowerblue' : null,
						padding: 10,
						width: '100%'
					},
					...(props.style || {})
				}} >
				<Text style={{ color: props.emphasis == 'high' ? 'white' : 'cornflowerblue' }}>{(props.children || '').toUpperCase()}</Text>
			</View >
	);
}

export const Header = props => {
	return (
		<View style={{
			alignItems: 'center',
			flexDirection: 'row',
			width: '100%',
			height: '5%',
			backgroundColor: 'blue'
		}}>
			<TouchableOpacity onPress={props.goBack} style={{
				alignItems: 'center',
				width: '10%'
			}}>
				<Text style={{ color: 'white', fontSize: 22 }}>{'\u25c0'}</Text>
			</TouchableOpacity>
			<Text style={{ marginLeft: 10, color: 'white' }}>{props.children}</Text>
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