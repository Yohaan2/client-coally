import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, deleteTaskById, filtertasks, getAllTasks, getTaskById, updateTaskById } from "../modules/task"

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess() {
      const createTaskInCache = (oldData: any) => {
        if (!oldData) return undefined
      }
      queryClient.setQueryData(["tasks"], createTaskInCache)
    }
  })
}

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTasks,
    refetchOnWindowFocus: false
  })

}

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id),
    refetchOnWindowFocus: false,
    enabled: !!id
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTaskById,
    onSuccess(data, variable) {
      console.log('data', data)
      console.log('variable', variable)
      const updateTaskInCache = (oldData: any) => {
        if (!oldData) return undefined
        oldData = oldData.map((item: any) => {
          if (item._id === variable.id) {
            item = {
              ...data.task
            }
          }
          return item
        })
        return oldData
      }
      queryClient.setQueryData(["tasks"], updateTaskInCache)
    }
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskById,
    onSuccess(_, variable) {
      const deleteTaskInCache = (oldData: any) => {
        if (!oldData) return undefined
        oldData = oldData.filter((item: any) => item._id !== variable)
        return oldData
      }
      queryClient.setQueryData(["tasks"], deleteTaskInCache)
    }
  })
}

export const usefilterTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: filtertasks,
    onSuccess(data) {
      const filterTasksInCache = (oldData: any) => {
        if (!oldData) return undefined
        oldData = data
        return data
      }
      queryClient.setQueryData(["tasks"], filterTasksInCache)
    }
  })
}