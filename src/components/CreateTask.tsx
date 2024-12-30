
import InputGroup from './InputGroup'
import SelectOne from './Select'
import * as yup from 'yup'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateTask } from '../hooks/useTasks';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

type TasksInputs = {
  title: string,
  status: string
  description?: string,
}

const listOptions = [
  'Select an option', 'pending', 'completed'
]

export default function CreateTask() {

  const { mutate, isSuccess, isError } = useCreateTask()

  const schemaTask = yup.object({
    title: yup.string().required('The title is required'),
    description: yup.string().optional(),
    status: yup.string().required('The status is required')
  })

  const { handleSubmit, control, reset } = useForm<TasksInputs>({
    resolver: yupResolver(schemaTask)
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Task created!')
    }
    if (isError) {
      toast.error('Error to created')
    }
  }, [isSuccess, isError])

  const onSubmit: SubmitHandler<TasksInputs> = (data) => {
    const sendData = {
      title: data.title,
      description: data.description,
      status: data.status
    }
    mutate(sendData)
    reset()
  }
  return (

    <div className="flex flex-col gap-9">
      <div><Toaster position='top-right' /></div>

      <div className="rounded-[10px] border border-stroke bg-white shadow-1  dark:bg-gray-7 dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-semibold text-dark dark:text-gray-dark">
            Create Task
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <Controller
              name='title'
              control={control}
              render={({ field, fieldState: { error: inputError } }) => (
                <InputGroup
                  label="Title"
                  type="text"
                  placeholder="Enter title"
                  value={field.value}
                  error={!!inputError}
                  helpText={inputError ? inputError.message : ''}
                  onChange={(e) => field.onChange(e.target.value)}
                  customClasses="mb-4.5"
                />
              )}
            />

            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <InputGroup
                  label="Description"
                  type="text"
                  placeholder="Enter description"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  customClasses="mb-4.5"
                />
              )}
            />

            <Controller
              name='status'
              control={control}
              render={({ field, fieldState: { error: inputError } }) => (
                <SelectOne
                  label="Status"
                  customClasses="mb-4.5"
                  options={listOptions}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!inputError}
                  helpText={inputError ? inputError.message : ''}
                />

              )}
            />


            <button
              className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              type='submit'>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
