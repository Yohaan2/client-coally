import { Task } from '../types/task'
import axios from '../utils/http'

export const createTask = async (data: Task): Promise<any> => {
	return await axios.post('/api/tasks', data)
}

export const getAllTasks = async (): Promise<any> => {
	return await axios.get('/api/tasks')
}

export const getTaskById = async (id: string): Promise<any> => {
	return await axios.get(`/api/tasks/${id}`)
}

export const updateTaskById = async (data: Task & { id: string }): Promise<any> => {
	const { id } = data
	return await axios.put(`/api/tasks/${id}`, data)
}

export const deleteTaskById = async (id: string): Promise<any> => {
	return await axios.delete(`/api/tasks/${id}`)
}

export const filtertasks = async (data: string) => {
	const sendData = { status: data }
	return await axios.post('/api/tasks/filter', sendData)
}
