import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
	},
	dialogImage: {
		alignSelf: 'center',
		width: 150,
		height: 150,
		marginTop: 50,
		marginBottom: 30
	},
	dialogContent: {
		textAlign: 'center',
		alignSelf: 'center'
	},
	listItem: {
		height: 60,
		paddingTop: 0
	},
	mainSummary: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		backgroundColor: 'cornflowerblue',
		width: '100%',
		height: '28%'
	},
	coinItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		height: 50,
		backgroundColor: 'white'
	}
});

export const CoinList = props => {
	return (
		<ScrollView
			contentContainerStyle={{
				alignItems: 'center',
				justifyContext: 'flex-start'
			}}
		>
			{props.coins.map(coin => <CoinItem key={coin.code} coin={coin} displayPrice={props.displayPrice} />)}
		</ScrollView>
	);
}

export const CoinItem = props => {
	return (
		<View style={styles.coinItem}>
			<View style={{ flexDirection: 'row', marginLeft: 10 }}>
				<Avatar.Image size={38} source={props.coin.logo} />
				<View
					style={{
						justifyContent: 'flex-start',
						flexDirection: 'column',
						height: '100%',
						marginLeft: 10
					}}>
					<Text
						style={{
							fontSize: props.displayPrice ? 14 : 18,
							color: 'black'
						}}
					>
						{props.coin.name}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start'
						}}>
						{props.displayPrice && <>
							<Text
								style={{
									fontSize: 14,
									color: 'gray'
								}}
							>
								{'$' + (props.coin.price.value || 0).toFixed(2)}
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: props.coin.price?.change ? (props.coin.price?.change > 0 ? 'darkgreen' : (props.coin.price?.change < 0 ? 'red' : 'black')) : 'black',
									marginLeft: 10
								}}
							>
								{(props.coin.price.change || 0).toFixed(2) + '%'}
							</Text>
						</>}
					</View>
				</View>
			</View>
			<View
				style={{
					marginRight: 10,
					height: '100%',
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center'
				}}
			>
				<Text
					style={{
						fontSize: 18,
						color: 'black'
					}}
				>
					{(props.coin.balance || 0).toFixed(3) + ' ' + props.coin.code}
				</Text>
			</View>
		</View>
	);
}