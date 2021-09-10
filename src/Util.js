export const messages = {
	required: 'This field is required.',
	error: 'This field has an error.',
	invalidPhrase: 'Your phrase is invalid.'
}

const timeout = (ms, promise) => {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error('TIMEOUT'))
		}, ms);
		promise.then(value => {
			clearTimeout(timer)
			resolve(value)
		}).catch(reason => {
			clearTimeout(timer)
			reject(reason)
		});
	});
}

export const fetchT = options => {
	return new Promise((resolve, reject) => {
		timeout(1000, fetch(options.url, options))
			.then(res => resolve(res))
			.catch(err => reject(err));
	});
}
