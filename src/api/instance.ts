import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosRequestHeaders
} from 'axios'

const instance = (token?: string): AxiosInstance => {
	let headers: AxiosRequestHeaders = { 'Content-Type': 'application/json' }
	if (token)
		headers = {
			...headers,
			Authorization: `Bearer ${token}`
		}
	if (!token) delete headers.token
	const config: AxiosRequestConfig = {
		headers,
		baseURL: 'https://bluehaven-api.onrender.com'
	}
	return axios.create(config)
}

export default instance
