import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
	size: 10,
	storageBackend: AsyncStorage
});

export default storage;