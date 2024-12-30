import { FaCalendarAlt } from "react-icons/fa"
import { TiDelete } from "react-icons/ti"
import { useGetTaskById } from "../hooks/useTasks"


interface CardDetailProps {
  setModal: (arg: boolean) => void,
  taskId: string
}

export default function CardDetailTask({ setModal, taskId }: CardDetailProps) {
  const { data } = useGetTaskById(taskId)
  const closeModal = () => {
    setModal(false)
  }
  return (
    <div className="relative z-800" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-dark/75 transition-opacity" aria-hidden="true"></div>

      <div className="fixed top-50 left-0 right-0 z-10 w-screen overflow-y-auto">

        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div
            className="w-6/12 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-7"
          >
            <div className="flex relative justify-between items-center">
              <div
                className="flex items-start justify-center rounded-full px-3 py-1  dark:text-gray-6"
                style={{ backgroundColor: data?.status ? '#3FD97F' : '#fdd835' }}
              >
                {data?.status ? 'Completed' : 'Pending'}

              </div>
              <div
                className="absolute right-0 cursor-pointer hover:scale-110  transition-transform duration-300"
                onClick={closeModal}>
                <TiDelete size={40} color="#FF7188" />
              </div>

            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-gray-dark">
                  {data?.title}
                </h4>
                <span className="text-body-sm font-medium dark:text-gray-6 line-clamp-3">{data?.description}</span>
                <div className="flex justify-start items-baseline mt-2">
                  <FaCalendarAlt size={13} color="#545454" />
                  <span className="text-body-xs ml-2 text-gray-600 tracking-wide">{new Date(data?.createdAt).toLocaleDateString('es-ES', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
