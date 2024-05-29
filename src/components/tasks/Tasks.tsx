import { ImFire } from 'react-icons/im';
import { useEffect, useState } from 'react';
import TaskService from '@/services/task';
import { TaskStatus } from '@/services/task/types';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';

const Tasks = () => {
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [isUpToDate, setIsUpToDate] = useState(0);

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

  const onDragEnd = (result: any) => {
    if (!result.destination || result.destination.droppableId === 'tasks') {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    TaskService.edit(
      {
        statusId: destination.droppableId,
      },
      result.draggableId,
    ).then((_response) => {});

    const fromStatus = taskStatuses.find(
      (status) => status._id === source.droppableId,
    );
    const toStatus = taskStatuses.find(
      (status) => status._id === destination.droppableId,
    );

    const task = fromStatus?.tasks?.find(
      (task) => task._id === result.draggableId,
    );
    fromStatus?.tasks.splice(source.index, 1);
    if (task) {
      toStatus?.tasks.splice(destination.index, 0, task);
      task.status = destination.droppableId;
    }
    setTaskStatuses([...taskStatuses]);
  };

  return (
    <div className='p-12'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-4 font-semibold text-4xl'>
          <ImFire className='text-red-500' />
          Tasks
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId='tasks'
          type='COLUMN'
          direction='horizontal'
          ignoreContainerClipping={false}
          isCombineEnabled={false}
        >
          {(provided) => (
            <div
              className={`flex flex-row w-full gap-x-4 mt-8`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskStatuses.map((taskStatus, i) => {
                return (
                  <TaskColumn
                    key={`task-column-${i}`}
                    index={i}
                    taskStatus={taskStatus}
                    statuses={statuses}
                    onUpdate={() => setIsUpToDate(isUpToDate + 1)}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
