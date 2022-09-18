import instance from '../../../api/instance'

const putData = (url: string, data: any, token?: string) =>
	new Promise<boolean>((resolve, reject) => {
		instance(token)
			.put(url, data)
			.then((res) => res.status === 200)
			.then(resolve)
			.catch(reject)
	})

export default putData
