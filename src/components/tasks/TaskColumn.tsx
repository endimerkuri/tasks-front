import Card from '@/core/cards/Card';
import { FaEllipsis } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import CreateTask from './CreateTask';
import { Status, TaskStatus } from '@/services/task/types';
import TaskCard from './TaskCard';

const TaskColumn = ({
  statuses,
  taskStatus,
  onUpdate,
}: {
  statuses: Status[];
  taskStatus: TaskStatus;
  onUpdate: () => void;
}) => {
  const [isCreateTaskModelOpen, setIsCreateTaskModelOpen] = useState(false);
  const hoverEffects =
    'hover:bg-primary hover:text-white cursor-pointer hover:scale-110 transition duration-150 ease-in-out';
  const { _id, description, tasks } = taskStatus;

  return (
    <div className='flex flex-col gap-y-6'>
      <CreateTask
        isCreateTaskModelOpen={isCreateTaskModelOpen}
        setIsCreateTaskModelOpen={setIsCreateTaskModelOpen}
        statusId={_id}
        status={description}
        statuses={statuses}
        onUpdate={onUpdate}
      />
      <Card>
        <div className='px-8 py-4 text-xl flex flex-row items-center justify-between'>
          {description}
          <div className='flex flex-row gap-4 items-center'>
            <div
              className={`text-3xl text-gray-500 p-1 hover:scale-125 rounded-lg hover:text-primary transition duration-150 ease-in-out cursor-pointer hover:bg-gray-200`}
            >
              <FaEllipsis />
            </div>
            <div
              className={`text-3xl text-primary p-1 bg-primary-10 rounded-lg ${hoverEffects}`}
              onClick={() => setIsCreateTaskModelOpen(true)}
            >
              <FaPlus className='p-1' />
            </div>
          </div>
        </div>
      </Card>
      {tasks &&
        tasks.map((task, i) => {
          return (
            <TaskCard
              i={i}
              task={task}
              statuses={statuses}
              onUpdate={onUpdate}
              status={description}
            />
          );
        })}
    </div>
  );
};

export default TaskColumn;
