import Card from '@/core/cards/Card';
import { FaEllipsis } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import CreateTask from './CreateTask';
import { Status, TaskStatus } from '@/services/task/types';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';

const TaskColumn = ({
  statuses,
  taskStatus,
  onUpdate,
}: {
  statuses: Status[];
  taskStatus: TaskStatus;
  onUpdate: () => void;
  index: number;
}) => {
  const [isCreateTaskModelOpen, setIsCreateTaskModelOpen] = useState(false);
  const [width, setWidth] = useState(`${window.innerWidth / 4 - 60}px`);

  const hoverEffects =
    'hover:bg-primary hover:text-white cursor-pointer hover:scale-110 transition duration-150 ease-in-out';
  const { _id, description, tasks } = taskStatus;

  useEffect(() => {
    const handleResize = () => {
      setWidth(`${window.innerWidth / 4 - 60}px`);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-col`} style={{ width }}>
      <CreateTask
        isCreateTaskModelOpen={isCreateTaskModelOpen}
        setIsCreateTaskModelOpen={setIsCreateTaskModelOpen}
        statusId={_id}
        status={description}
        statuses={statuses}
        onUpdate={onUpdate}
      />
      <Card>
        <div
          className={`px-8 py-4 text-xl flex flex-row items-center justify-between`}
          style={{ width }}
        >
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
      <Droppable
        droppableId={_id}
        type='TASK'
        ignoreContainerClipping={false}
        isDropDisabled={false}
        isCombineEnabled={false}
      >
        {(dropProvided, dropSnapshot) => (
          <div
            key={_id}
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
            className='flex flex-col gap-y-6 min-h-screen pt-6'
          >
            {tasks &&
              tasks.map((task, i) => {
                return (
                  <TaskCard
                    key={task._id}
                    i={i}
                    task={task}
                    statuses={statuses}
                    onUpdate={onUpdate}
                    status={description}
                  />
                );
              })}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
