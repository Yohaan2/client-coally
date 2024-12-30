import axios, { AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_HOST_API,
})

axiosInstance.interceptors.response.use((response) => response.data)

export default axiosInstance
