import instance from '../../../../api/instance'

const postData = (url: string, data: FinishedProductProps, token?: string) =>
	new Promise<boolean>((resolve, reject) => {
		instance(token)
			.post(url, data)
			.then((res) => resolve(res.status === 200))
			.catch(reject)
	})

export default postData
