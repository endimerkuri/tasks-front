import Card from '@/core/cards/Card';
import { FaPlay } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa';
import { TbLink } from 'react-icons/tb';
import { FaRegCommentDots } from 'react-icons/fa';
import { GoStopwatch } from 'react-icons/go';
import DefaultButton from '@/core/buttons/electrons/DefaultButton';

interface Task {
  startTime: string;
  name: string;
  commentNo: number;
  completedPercentage: number;
  link: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card>
      <div className='grid grid-cols-5'>
        <div className='flex flex-row bg-primary-background rounded-l-2xl items-center pl-8'>
          <div className='bg-primary text-white cursor-pointer p-5 rounded-full drop-shadow-xl hover:scale-125 transition duration-150 ease-in-out'>
            <FaPlay />
          </div>
          <div className='flex flex-col pl-8'>
            <p>Start from</p>
            <div className='flex flex-row items-center gap-x-2 text-slate-500 font-semibold'>
              <FaRegClock />
              {task.startTime}
            </div>
          </div>
        </div>
        <div className='flex flex-col p-8'>
          <p>{task.name}</p>
          <div className='flex flex-row items-center gap-x-2 text-slate-500 font-semibold'>
            <TbLink />
            <a
              href={task.link}
              className='hover:underline hover:text-blue cursor-pointer'
            >
              {task.link}
            </a>
          </div>
        </div>
        <div className='flex flex-col justify-end p-8 text-slate-500'>
          <div className='flex flex-row items-center gap-x-2 text-slate-500 font-semibold'>
            <FaRegCommentDots />
            <p className=' font-semibold'>{task.commentNo} Comments</p>
          </div>
        </div>
        <div className='flex flex-col p-8 gap-y-2 justify-center'>
          <p>{task.completedPercentage}% complete</p>
          <div className='h-2 bg-slate-300 rounded-full'>
            <div
              className='h-2 bg-blue rounded-full'
              style={{ width: `${task.completedPercentage}%` }}
            />
          </div>
        </div>
        <div className='flex justify-end items-center py-8 pr-12'>
          <DefaultButton
            icon={<GoStopwatch className='text-2xl mr-2' />}
            bgColor='bg-primary-dark'
            bgColorHover='hover:bg-primary-dark hover:scale-110'
            textColor='text-primary'
            label='Reminder'
            rounded='rounded-xl'
            width='w-3/5'
          />
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
