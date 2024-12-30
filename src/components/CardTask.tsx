import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import EditModal from "./EditModal";
import { FaCalendarAlt } from "react-icons/fa";
import CardDetailTask from "./CardDetailTask";
import { useGetAllTasks } from "../hooks/useTasks";

interface Task {
  _id: string
  status: boolean;
  color: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function CardTask() {
  const [openModalDeleteTask, setOpenModalDeleteTask] = useState<boolean>(false)
  const [openEditTaskModal, setOpenEditTaskModal] = useState<boolean>(false)
  const [openDetailTaskModal, setOpenDetailTaskModal] = useState<boolean>(false)
  const [taskSelected, setTaskSeleted] = useState<string>('')
  const { data } = useGetAllTasks()
  console.log(data)

  const handleTaskDeleteSelected = (id: string) => {
    setTaskSeleted(id)
    setOpenModalDeleteTask(true)
  }
  const handleTaskEditSelected = (id: string) => {
    setTaskSeleted(id)
    setOpenEditTaskModal(true)
  }
  const handleTaskDetailSelected = (id: string) => {
    console.log(id)
    setTaskSeleted(id)
    setOpenDetailTaskModal(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {data?.map((item: Task, index: number) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-7 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center">
              <div
                className="flex items-start justify-center rounded-full px-3 py-1  dark:text-gray-6"
                style={{ backgroundColor: item.status === true ? '#3FD97F' : '#fdd835' }}
              >
                {item.status ? 'Completed' : 'Pending'}

              </div>
              <div className="flex justify-between gap-2">
                <div
                  className="cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => handleTaskDeleteSelected(item._id)}
                >
                  <MdDelete size={25} color={'#FF7188'} />
                </div>
                <div className="cursor-pointer hover:scale-110 
                transition-transform duration-300"
                  onClick={() => handleTaskEditSelected(item._id)}
                >
                  <TbEdit size={25} color='#3761E9' />
                </div>
              </div>

            </div>

            <div className="mt-4 flex items-end justify-between">
              <div onClick={() => handleTaskDetailSelected(item._id)}>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-gray-dark hover:text-blue-900">
                  {item.title}
                </h4>
                <span className="text-body-sm font-medium dark:text-gray-6 line-clamp-3">{item.description}</span>
                <div className="flex justify-start items-baseline mt-2">
                  <FaCalendarAlt size={13} color="#545454" />
                  <span className="text-body-xs ml-2 text-gray-600 tracking-wide">{new Date(item.createdAt).toLocaleDateString('es-ES', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {data?.length === 0 && (
          <h2 className="text-5xl text-center font-semibold text-gray-dark dark:text-gray-dark">No Task</h2>
        )}
      </div>
      {
        openModalDeleteTask && <DeleteModal setIsOpenModal={setOpenModalDeleteTask} taskId={taskSelected} />
      }
      {
        openEditTaskModal && <EditModal setModal={setOpenEditTaskModal} taskId={taskSelected} />
      }
      {
        openDetailTaskModal && <CardDetailTask setModal={setOpenDetailTaskModal} taskId={taskSelected} />
      }
    </>
  );
}
