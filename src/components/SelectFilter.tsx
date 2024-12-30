import { useState } from "react";
import { usefilterTasks } from "../hooks/useTasks";

const SelectFilter = () => {
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const { mutate } = usefilterTasks()

  const handleFilter = (e: string) => {
    setSelectedOption(e)
    console.log(e)
    mutate(e)
  }

  return (
    <>
      <li className="hidden lg:block">
        <form>
          <div className="relative w-full max-w-[300px]">

            <select
              value={selectedOption}
              onChange={(e) => {
                handleFilter(e.target.value)
              }}
              className={`w-full rounded-full border border-stroke bg-gray-2 py-3 pl-4 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:placeholder-gray-6 dark:focus:border-primary xl:w-[300px]`}
            >
              <option value="all" className="text-gray-dark">All</option>
              <option value="completed" className="text-gray-dark">Completed</option>
              <option value="pending" className="text-gray-dark">Pending</option>
            </select>
          </div>
        </form>
      </li>
    </>
  );
};

export default SelectFilter;
