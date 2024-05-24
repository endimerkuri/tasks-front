import { ImFire } from 'react-icons/im';
import TaskColumn from './TaskColumn';
import { useEffect, useState } from 'react';
import TaskService from '@/services/task';
import { TaskStatus } from '@/services/task/types';

const Tasks = () => {
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [isUpToDate, setIsUpToDate] = useState(0);

  // const taskColumns = [
  //   {
  //     status: 'Backlog',
  //     tasks: [
  //       {
  //         label: 'Design',
  //         labelColor: '#5051F9',
  //         title: 'Create styleguide foundation',
  //         description: 'Create content for peaceland App',
  //         date: 'Aug 20, 2021',
  //         pictureUrl:
  //           'https://s3-alpha-sig.figma.com/img/584c/a172/e1f779e8b87c1cbe16d78a804b704456?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HHF6Yavt60J~Nw9Rpp6JaWQtGv2W5ve81kBP1J2SL8~v36xniu3K24LC4788ea4dhzATHW7EjjanJ0fLZx1XYDCE8yet01pPH-uZGg8KLp7lPth6ph438T6U~28e8iWRG89QfVMaJsSiYHYha16RWi~R4RXL4pohtXWCGibWmJyL9r7-x9OJHrb~XW3hjRyiPE5621TeiHPILi4f7Czjc4tS9bXRx-D1713WcyMQb3jL2cYDnZ4VB8lp1gppr5TcYHh0emB9kyQyPSfKdkIrra27E4dm15QOyHvpMdochXoUmSLW5d~rehBqk55lk7tKPAuRL4f0~dC7P53IXZOCCw__',
  //       },
  //     ],
  //   },
  //   {
  //     status: 'To Do',
  //     tasks: [],
  //   },
  //   {
  //     status: 'In Progress',
  //     tasks: [],
  //   },
  //   {
  //     status: 'Review',
  //     tasks: [],
  //   },
  // ];

  useEffect(() => {
    TaskService.get().then((response) => {
      const { groupedTasks } = response.data.data;
      setTaskStatuses(groupedTasks);
    });
  }, [isUpToDate]);

  const statuses = taskStatuses.map((taskStatus) => ({
    _id: taskStatus._id,
    description: taskStatus.description,
  }));

  return (
    <div className='p-12'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-4 font-semibold text-4xl'>
          <ImFire className='text-red-500' />
          Tasks
        </div>
      </div>
      <div className={`grid grid-flow-col auto-cols-fr w-full gap-x-4 mt-8`}>
        {taskStatuses.map((taskStatus, i) => {
          return (
            <TaskColumn
              key={`task-column-${i}`}
              taskStatus={taskStatus}
              statuses={statuses}
              onUpdate={() => setIsUpToDate(isUpToDate + 1)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
