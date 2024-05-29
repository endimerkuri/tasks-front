import Card from '@/core/cards/Card';
import EditTask from './EditTask';
import dayjs from 'dayjs';
import { VscComment } from 'react-icons/vsc';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Status, Task } from '@/services/task/types';
import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';

interface TaskCardProps {
  i: number;
  task: Task;
  statuses: Status[];
  onUpdate: () => void;
  status: string;
}

const TaskCard = ({ i, task, statuses, onUpdate, status }: TaskCardProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Draggable key={task._id} draggableId={task._id} index={i}>
      {(dragProvided, _dragSnapshot) => (
        <div
          key={task._id}
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          <EditTask
            showModal={showModal}
            setShowModal={setShowModal}
            task={task}
            onUpdate={onUpdate}
            status={status}
            statuses={statuses}
          />
          <Card key={task._id}>
            <div
              className='p-6 flex flex-col gap-y-4 cursor-pointer hover:bg-gray-100 hover:rounded-xl transition duration-150 ease-in-out'
              onClick={() => setShowModal(true)}
            >
              {task.label && (
                <div className='flex'>
                  <div
                    className={`text-white rounded-lg py-2 px-4`}
                    style={{ backgroundColor: task.labelColor }}
                  >
                    {task.label}
                  </div>
                </div>
              )}
              {task.pictureUrl && (
                <img src={task.pictureUrl} className='rounded-lg' />
              )}
              <div>
                <div className='text-lg'>{task.title}</div>
                <div className='text-gray-500'>{task.description}</div>
              </div>
              <div className='flex'>
                <div className='border border-gray-400 px-2 rounded-md'>
                  <div className='text-gray-600'>
                    {dayjs(task.due).format('MMM DD, YYYY')}
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-row items-center'>
                  <VscComment className='text-gray-500 text-xl' />
                  <div className='text-gray-500 ml-2'>4 comments</div>
                </div>
                <div className='flex flex-row items-center'>
                  <FaRegCheckCircle className='text-gray-500 text-xl' />
                  <div className='text-gray-500 ml-2'>0/8</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
