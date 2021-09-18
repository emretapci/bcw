import React, { useState, useEffect } from 'react';
import { Portal, Dialog, Paragraph, Button, Avatar, Snackbar } from 'react-native-paper';
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { Chains } from './Blockchain';
import Clipboard from '@react-native-clipboard/clipboard';
import RNQRGenerator from 'rn-qr-generator';

export const ReceiveTransactionScreen = () => {
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [chain, setChain] = useState();

	return (
		<Portal.Host>
			<Portal>
				{chain &&
					<QrCodeDialog
						setSnackbarVisible={setSnackbarVisible}
						close={() => setChain(null)}
						address={Chains[chain].address}
					/>
				}
			</Portal>
			<ScrollView>
				{Object.keys(Chains).map(chainName => <ChainItem key={chainName} chain={Chains[chainName]} selected={chain => setChain(chain)} />)}
			</ScrollView>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={() => setSnackbarVisible(false)}
				duration={1000}
			>
				Address copied.
			</Snackbar>
		</Portal.Host>
	);
}

const QrCodeDialog = props => {
	const [imageUri, setImageUri] = useState();

	useEffect(() => RNQRGenerator.generate({
		value: props.address,
		height: 200,
		width: 200
	}).then(response => {
		const { uri } = response;
		setImageUri(uri);
	}), []);

	const copyAddress = () => {
		Clipboard.setString(props.address);
		props.setSnackbarVisible(true);
	}

	return (
		<Dialog visible={true} onDismiss={props.close}>
			<Dialog.Content
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Paragraph style={{
					marginTop: '5%',
					fontSize: 20,
					textAlign: 'center'
				}}>
					Scan address
				</Paragraph>
				<Paragraph style={{
					fontSize: 20,
					textAlign: 'center'
				}}>
					to receive payment
				</Paragraph>
				<Image
					source={{
						uri: imageUri,
						width: 200,
						height: 200
					}}
					style={{
						marginTop: 15
					}}
				/>
				<Paragraph style={{
					marginTop: '5%',
					textAlign: 'center'
				}}>
					{props.address}
				</Paragraph>
			</Dialog.Content>
			<Dialog.Actions>
				<View style={{ padding: 10, width: '100%' }}>
					<Button
						icon='content-copy'
						size={35}
						style={{
							backgroundColor: '#77a1ee',
							marginBottom: 10
						}}
						onPress={copyAddress}
					>
						copy
					</Button>
					<Button
						mode='contained'
						onPress={props.close}
					>
						done
					</Button>
				</View>
			</Dialog.Actions>
		</Dialog>
	);
}

const ChainItem = props =>
	<TouchableOpacity onPress={() => props.selected(props.chain.name)}>
		<View
			style={{
				marginBottom: 0,
				marginLeft: 4,
				marginTop: 4,
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Avatar.Image
				size={props.iconSize}
				source={props.chain.logo}
			/>
			<View
				style={{
					marginLeft: 10,
					marginBottom: 5,
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Text style={{ fontSize: 20 }}>{props.chain.code}</Text>
				<Text style={{ marginLeft: 10, fontSize: 14 }}>{props.chain.name}</Text>
			</View>
		</View>
	</TouchableOpacity>
