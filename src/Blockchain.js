import { NativeModules } from 'react-native';
import { fetchT } from './Util';
import { keccak256 } from 'js-sha3';

let WalletCore = NativeModules.WalletCore;

export const Chains = {
	Ethereum: {
		name: 'Ethereum',
		walletCoreCode: 60,
		nodeUrl: 'http://173.249.57.83:81/n4dAfCs1SG2p9JnaZ36BBfdbh3/',
		//nodeUrl: 'http://192.168.1.20:8545'
		logo: require('../resources/coins/ETH.png')
	},
	BSC: {
		name: 'BSC',
		walletCoreCode: 714,
		logo: require('../resources/coins/BNB.png')
	},
	Algorand: {
		name: 'Algorand',
		walletCoreCode: 283,
		logo: require('../resources/coins/ALGO.png'),
	},
	Bitcoin: {
		name: 'Bitcoin',
		walletCoreCode: 0,
		logo: require('../resources/coins/BTC.png'),
	},
	Dash: {
		name: 'Dash',
		walletCoreCode: 5,
		logo: require('../resources/coins/DASH.png'),
	},
	BC: {
		name: 'BC',
		walletCoreCode: 714,
		logo: require('../resources/coins/BNB.png')
	},
	Solana: {
		name: 'Solana',
		walletCoreCode: 501,
		logo: require('../resources/coins/SOL.png'),
	},
	VeChain: {
		name: 'VeChain',
		walletCoreCode: 818,
		logo: require('../resources/coins/VET.png'),
	},
	Waves: {
		name: 'Waves',
		walletCoreCode: 5741564,
		logo: require('../resources/coins/WAVES.png'),
	},
	Stellar: {
		name: 'Stellar',
		walletCoreCode: 148,
		logo: require('../resources/coins/XLM.png'),
	}
}

export const Coins = {
	EMT: {
		name: 'Emre Token',
		code: 'EMT',
		logo: require('../resources/coins/EMT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x2bf902441123355fd860d049A8Fb214267fd3bF6'
	},
	AAVE: {
		name: 'Aave',
		code: 'AAVE',
		logo: require('../resources/coins/AAVE.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9'
	},
	ADA: {
		name: 'Cardano',
		code: 'ADA',
		logo: require('../resources/coins/ADA.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47'
	},
	ALGO: {
		name: 'Algorand',
		code: 'ALGO',
		logo: require('../resources/coins/ALGO.png'),
		isNative: true,
		chain: 'Algorand'
	},
	ARPA: {
		name: 'ARPA Chain',
		code: 'ARPA',
		logo: require('../resources/coins/ARPA.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xba50933c268f567bdc86e1ac131be072c6b0b71a'
	},
	AVAX: {
		name: 'Avalanche',
		code: 'AVAX',
		logo: require('../resources/coins/AVAX.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x1ce0c2827e2ef14d5c4f29a091d735a204794041'
	},
	BAT: {
		name: 'Basic Attention Token',
		code: 'BAT',
		logo: require('../resources/coins/BAT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef'
	},
	BCH: {
		name: 'Bitcoin Cash',
		code: 'BCH',
		logo: require('../resources/coins/BCH.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf'
	},
	BTC: {
		name: 'Bitcoin',
		code: 'BTC',
		logo: require('../resources/coins/BTC.png'),
		isNative: true,
		chain: 'Bitcoin'
	},
	BTT: {
		name: 'BitTorrent',
		code: 'BTT',
		logo: require('../resources/coins/BTT.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x8595f9da7b868b1822194faed312235e43007b49'
	},
	CELR: {
		name: 'Celer Network',
		code: 'CELR',
		logo: require('../resources/coins/CELR.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x4f9254c83eb525f9fcf346490bbb3ed28a81c667'
	},
	CHZ: {
		name: 'Chiliz',
		code: 'CHZ',
		logo: require('../resources/coins/CHZ.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x3506424f91fd33084466f402d5d97f05f8e3b4af'
	},
	COMP: {
		name: 'Compound',
		code: 'COMP',
		logo: require('../resources/coins/COMP.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xc00e94cb662c3520282e6f5717214004a7f26888'
	},
	CRV: {
		name: 'Curve DAO Token',
		code: 'CRV',
		logo: require('../resources/coins/CRV.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xD533a949740bb3306d119CC777fa900bA034cd52'
	},
	CVC: {
		name: 'Civic',
		code: 'CVC',
		logo: require('../resources/coins/CVC.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x41e5560054824ea6b0732e656e3ad64e20e94e45'
	},
	DAI: {
		name: 'Dai',
		code: 'DAI',
		logo: require('../resources/coins/DAI.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x6b175474e89094c44da98b954eedeac495271d0f'
	},
	DASH: {
		name: 'Dash',
		code: 'DASH',
		logo: require('../resources/coins/DASH.png'),
		isNative: true,
		chain: 'Dash'
	},
	DOGE: {
		name: 'Dogecoin',
		code: 'DOGE',
		logo: require('../resources/coins/DOGE.png'),
		isNative: false,
		chain: 'BSC',
		address: '0xba2ae424d960c26247dd6c32edc70b295c744c43'
	},
	DOT: {
		name: 'Polkadot',
		code: 'DOT',
		logo: require('../resources/coins/DOT.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'
	},
	EGT: {
		name: 'Egretia',
		code: 'EGT',
		logo: require('../resources/coins/EGT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x8e1b448ec7adfc7fa35fc2e885678bd323176e34'
	},
	EKT: {
		name: 'EDUCare',
		code: 'EKT',
		logo: require('../resources/coins/EKT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x4ecdb6385f3db3847f9c4a9bf3f9917bb27a5452'
	},
	ELF: {
		name: 'aelf',
		code: 'ELF',
		logo: require('../resources/coins/ELF.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e'
	},
	ENJ: {
		name: 'Enjin Coin',
		code: 'ENJ',
		logo: require('../resources/coins/ENJ.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c'
	},
	ETC: {
		name: 'Ethereum Classic',
		code: 'ETC',
		logo: require('../resources/coins/ETC.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x3d6545b08693dae087e957cb1180ee38b9e3c25e'
	},
	ETH: {
		name: 'Ethereum',
		code: 'ETH',
		logo: require('../resources/coins/ETH.png'),
		isNative: true,
		chain: 'Ethereum'
	},
	FTT: {
		name: 'FTX Token',
		code: 'FTT',
		logo: require('../resources/coins/FTT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9'
	},
	GLM: {
		name: 'Golem',
		code: 'GLM',
		logo: require('../resources/coins/GLM.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429'
	},
	HOT: {
		name: 'Holo',
		code: 'HOT',
		logo: require('../resources/coins/HOT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x6c6ee5e31d828de241282b9606c8e98ea48526e2'
	},
	HT: {
		name: 'Huobi Token',
		code: 'HT',
		logo: require('../resources/coins/HT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x6f259637dcd74c767781e37bc6133cd6a68aa161'
	},
	KAN: {
		name: 'BitKan',
		code: 'KAN',
		logo: require('../resources/coins/KAN.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x1410434b0346f5be678d0fb554e5c7ab620f8f4a'
	},
	KNC: {
		name: 'Kyber Network Crystal v2',
		code: 'KNC',
		logo: require('../resources/coins/KNC.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202'
	},
	LAMB: {
		name: 'Lambda',
		code: 'LAMB',
		logo: require('../resources/coins/LAMB.png'),
		isNative: false,
		chain: 'BC',
		address: 'LAMB-46C'
	},
	LINK: {
		name: 'Chainlink',
		code: 'LINK',
		logo: require('../resources/coins/LINK.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x514910771af9ca656af840dff83e8264ecf986ca'
	},
	LTC: {
		name: 'Litecoin',
		code: 'LTC',
		logo: require('../resources/coins/LTC.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94'
	},
	MANA: {
		name: 'Decentraland',
		code: 'MANA',
		logo: require('../resources/coins/MANA.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942'
	},
	MATIC: {
		name: 'Polygon',
		code: 'MATIC',
		logo: require('../resources/coins/MATIC.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
	},
	MKR: {
		name: 'Maker',
		code: 'MKR',
		logo: require('../resources/coins/MKR.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
	},
	OMG: {
		name: 'OMG Network',
		code: 'OMG',
		logo: require('../resources/coins/OMG.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'
	},
	REN: {
		name: 'Ren',
		code: 'REN',
		logo: require('../resources/coins/REN.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x408e41876cccdc0f92210600ef50372656052a38'
	},
	SHIB: {
		name: 'SHIBA INU',
		code: 'SHIB',
		logo: require('../resources/coins/SHIB.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'
	},
	SNT: {
		name: 'Status',
		code: 'SNT',
		logo: require('../resources/coins/SNT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e'
	},
	SOL: {
		name: 'Solana',
		code: 'SOL',
		logo: require('../resources/coins/SOL.png'),
		isNative: true,
		chain: 'Solana'
	},
	STORJ: {
		name: 'Storj',
		code: 'STORJ',
		logo: require('../resources/coins/STORJ.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac'
	},
	SXP: {
		name: 'Swipe',
		code: 'SXP',
		logo: require('../resources/coins/SXP.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9'
	},
	TRX: {
		name: 'TRON',
		code: 'TRX',
		logo: require('../resources/coins/TRX.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x85eac5ac2f758618dfa09bdbe0cf174e7d574d5b'
	},
	TRYB: {
		name: 'BiLira',
		code: 'TRYB',
		logo: require('../resources/coins/TRYB.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x2c537e5624e4af88a7ae4060c022609376c8d0eb'
	},
	UNI: {
		name: 'Uniswap',
		code: 'UNI',
		logo: require('../resources/coins/UNI.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
	},
	USDT: {
		name: 'Tether',
		code: 'USDT',
		logo: require('../resources/coins/USDT.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xdac17f958d2ee523a2206206994597c13d831ec7'
	},
	VET: {
		name: 'VeChain',
		code: 'VET',
		logo: require('../resources/coins/VET.png'),
		isNative: true,
		chain: 'VeChain'
	},
	WAVES: {
		name: 'Waves',
		code: 'WAVES',
		logo: require('../resources/coins/WAVES.png'),
		isNative: true,
		chain: 'Waves'
	},
	WBTC: {
		name: 'Wrapped Bitcoin',
		code: 'WBTC',
		logo: require('../resources/coins/WBTC.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
	},
	WTC: {
		name: 'Waltonchain',
		code: 'WTC',
		logo: require('../resources/coins/WTC.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74'
	},
	XLM: {
		name: 'Stellar',
		code: 'XLM',
		logo: require('../resources/coins/XLM.png'),
		isNative: true,
		chain: 'Stellar'
	},
	XRP: {
		name: 'XRP',
		code: 'XRP',
		logo: require('../resources/coins/XRP.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe'
	},
	XTZ: {
		name: 'Tezos',
		code: 'XTZ',
		logo: require('../resources/coins/XTZ.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x16939ef78684453bfdfb47825f8a5f714f12623a'
	},
	ZEC: {
		name: 'Zcash',
		code: 'ZEC',
		logo: require('../resources/coins/ZEC.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x1ba42e5193dfa8b03d15dd1b86a3113bbbef8eeb'
	},
	ZRX: {
		name: '0x',
		code: 'ZRX',
		logo: require('../resources/coins/ZRX.png'),
		isNative: false,
		chain: 'Ethereum',
		address: '0xe41d2489571d322189246dafa5ebde1f4699f498'
	},
	EOS: {
		name: 'EOS',
		code: 'EOS',
		logo: require('../resources/coins/EOS.png'),
		isNative: false,
		chain: 'BSC',
		address: '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6'
	}
}

export const Wallet = {
	import: phrase => new Promise((resolve, reject) => WalletCore.importWallet(phrase, reject, resolve)),

	generateAddresses: async () => {
		await Promise.all(Object.keys(Chains).map(chainName => {
			return new Promise(resolve => {
				NativeModules.WalletCore.getAddressForCoin(Chains[chainName].walletCoreCode,
					address => {
						Chains[chainName].address = address;
						resolve();
					}
				);
			})
		}));
	}
}

export const Ethereum = {
	_getLatestTransactionCount: async () => {
		const res = await makeJsonRpcCall({
			url: Chains['Ethereum'].nodeUrl,
			methodName: 'eth_getTransactionCount',
			params: [Chains['Ethereum'].address, 'latest']
		});
		return parseInt(res.result, 16);
	},

	_getEthAssets: async () => {
		const balance = await makeJsonRpcCall({
			url: Chains['Ethereum'].nodeUrl,
			methodName: 'eth_getBalance',
			params: [Chains['Ethereum'].address, 'latest']
		});
		return balance ? balance.result / 1000000000000000000 : null;
	},

	_getGasPrice: async () => {
		const gasPrice = await makeJsonRpcCall({
			url: Chains['Ethereum'].nodeUrl,
			methodName: 'eth_gasPrice'
		});
		return parseInt(gasPrice.result, 16);
	},

	_getGasEstimate: async () => {
		const gasEstimate = await makeJsonRpcCall({
			url: Chains['Ethereum'].nodeUrl,
			methodName: 'eth_estimateGas',
			params: [{ from: Chains['Ethereum'].address }]
		});
		return parseInt(gasEstimate.result, 16);
	}
}

export const Prices = {
	getPrices: async () => {
		try {
			const res = await fetchT({
				url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=' + Object.keys(Coins).join(','),
				method: 'GET',
				headers: {
					'X-CMC_PRO_API_KEY': '93ed9c4e-186a-4185-819d-b8241bfaa8f9'
				}
			});
			const data = (await res.json()).data;
			const ret = Object.keys(data).reduce((all, code) => Object.assign(all, {
				[code]: {
					price: {
						value: data[code].quote.USD.price,
						change: data[code].quote.USD.percent_change_1h
					}
				}
			}), {});
			return ret;
		}
		catch (err) {
			return {};
		}
	}
}

export const ERC20 = {
	transfer: async (contractTo, tokenTo, tokenAmount) => {
		const signedTransaction = await ERC20._createTransaction({
			contractTo,
			gasPrice: await Ethereum._getGasPrice(),
			gasLimit: await Ethereum._getGasEstimate(),
			nonce: await Ethereum._getLatestTransactionCount(),
			tokenTo,
			tokenAmount
		});

		const sendTransactionResponse = await makeJsonRpcCall({
			url: Chains['Ethereum'].nodeUrl,
			methodName: 'eth_sendRawTransaction',
			params: [signedTransaction]
		});

		return sendTransactionResponse;
	},

	totalSupply: async contract => {
		const data = keccak256('totalSupply()').toString('hex').slice(0, 8);

		return await makeJsonRpcCall({
			url: Chains['Ethereum'].nodeUrl,
			methodName: 'eth_call',
			params: [{
				data,
				to: contract
			},
				'latest']
		});
	},

	balanceOf: async (contract, address) => {
		const data = '0x' + keccak256('balanceOf(address)').toString('hex').slice(0, 8) +
			address.replace('0x', '').padStart(64, '0');

		try {
			const res = await makeJsonRpcCall({
				url: Chains['Ethereum'].nodeUrl,
				methodName: 'eth_call',
				params: [{
					data,
					to: contract
				},
					'latest']
			});
			const balance = parseInt(res.result, 16);
			return Number.isNaN(balance) ? 0 : balance;
		}
		catch(err) {
			console.log(err);
			return 0;
		}
	},

	_createTransaction: tx => new Promise(resolve => NativeModules.WalletCore.createERC20Transaction(JSON.stringify(tx), data => resolve(data))),
}

const makeJsonRpcCall = async ({ url, methodName, params }) => {
	try {
		const res = await fetchT({
			url,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				jsonrpc: '2.0',
				method: methodName,
				params: params || [],
				id: 1
			}),
			duration: 5000
		});
		return await res.json();
	}
	catch (err) {
		console.log(params, err);
		return null;
	}
}
