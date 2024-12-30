import InputGroup from "./InputGroup";
import SelectOne from "./Select";
import { TiDelete } from "react-icons/ti";
import * as yup from 'yup'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetTaskById, useUpdateTask } from "../hooks/useTasks";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

interface EditModalProps {
  setModal: (arg: boolean) => void,
  taskId: string
}

const listOptions = [
  'pending', 'completed'
]

type TasksEditInputs = {
  title: string,
  status: string
  description?: string,
}

export default function EditModal({ setModal, taskId }: EditModalProps) {

  const { data } = useGetTaskById(taskId)
  const { mutate, isError, isSuccess } = useUpdateTask()

  const schemaEditTask = yup.object({
    title: yup.string().required('The title is required'),
    description: yup.string().optional(),
    status: yup.string().required('The status is required')
  })

  const { handleSubmit, control } = useForm<TasksEditInputs>({
    resolver: yupResolver(schemaEditTask),
    defaultValues: {
      title: data?.title,
      description: data?.description,
      status: data?.status ? 'completed' : 'pending'
    }
  })

  useEffect(() => {
    if (isError) {
      toast.error('Error editing task')
    }

    if (isSuccess) {
      toast.success('Task edited successfully')
    }

  }, [isSuccess, isError])

  const onSubmit: SubmitHandler<TasksEditInputs> = (data) => {
    const sendData = {
      ...data,
      id: taskId
    }
    mutate(sendData)
    closeModal()
  }

  const closeModal = () => {
    setModal(false)
  }
  return (
    <div className="relative z-800" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-dark/75 transition-opacity" aria-hidden="true"></div>
      <div><Toaster position='top-right' /></div>

      <div className="fixed top-50 left-0 right-0 z-10 w-screen overflow-y-auto">


        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="w-96 rounded-[10px] border border-stroke bg-white shadow-1 dark:bg-white dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <div className="flex justify-center items-center relative">

                <h3 className="font-semibold text-dark dark:text-gray-dark">
                  Create task
                </h3>
                <div className="absolute right-0 cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={closeModal}
                >
                  <TiDelete size={40} color="#FF7188" />
                </div>
              </div>
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

                <button className="flex w-full justify-center rounded-[7px] bg-gray-dark p-[13px] font-medium text-white hover:bg-opacity-90">
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

    </div>
  )
}
