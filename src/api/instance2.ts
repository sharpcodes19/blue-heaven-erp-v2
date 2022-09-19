import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

const instance2 = (token?: string): AxiosInstance => {
	let headers: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
	if (token)
		headers = {
			...headers,
			Authorization: `Bearer ${token}`
		}
	if (!token) delete headers.token
	const config: AxiosRequestConfig = { headers, baseURL: 'https://apitestblueheavens.herokuapp.com' }
	return axios.create(config)
}

export default instance2
