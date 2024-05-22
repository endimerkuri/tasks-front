import { tokenSelector } from '@/redux/slices/auth';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProgressCard from './ProgressCard';
import { FaRegStar } from 'react-icons/fa';
import { FaRegFileAlt } from 'react-icons/fa';
import { LuClipboardList } from 'react-icons/lu';
import TasksPerPeriodCard from './TasksPerPeriodCard';
import TaskCard from './TaskCard';

const Dashboard = () => {
  const navigate = useNavigate({ from: '/' });
  const accessToken = useSelector(tokenSelector);

  useEffect(() => {
    if (!accessToken) {
      navigate({ to: '/login' });
    }
  }, [accessToken]);

  const prs = [
    {
      title: 'Tasks Completed',
      icon: <FaRegStar />,
      total: 10,
      color: '#5051F9',
      more: 5,
    },
    {
      title: 'New Tasks',
      icon: <FaRegFileAlt />,
      total: 8,
      color: '#1EA7FF',
      more: 2,
    },
    {
      title: 'Projects Done',
      icon: <LuClipboardList />,
      total: 10,
      color: '#FF614C',
      more: 10,
    },
  ];

  const tasks = [
    {
      startTime: '10:00',
      name: 'Designing',
      link: 'https://www.google.com',
      commentNo: 5,
      completedPercentage: 50,
    },
    {
      startTime: '09:00',
      name: 'Search Inspiration for project',
      link: 'https://www.uistore.com',
      commentNo: 8,
      completedPercentage: 24,
    },
  ];

  return (
    <div className='p-12'>
      <div className='grid grid-cols-3 w-full gap-12 mb-12'>
        {prs.map((pr, i) => {
          return (
            <ProgressCard
              key={`pr-${i}`}
              title={pr.title}
              icon={pr.icon}
              total={pr.total}
              color={pr.color}
              more={pr.more}
            />
          );
        })}
      </div>
      <TasksPerPeriodCard title='Tasks Done' />
      <div className='mt-12'>
        <p className='text-3xl font-semibold'>Tasks</p>
        <div className='flex flex-col gap-y-6 mt-4'>
          {tasks.map((task, i) => {
            return <TaskCard key={`task-${i}`} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
