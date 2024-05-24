import SimpleInput from '@/core/inputs/SimpleInput';
import EditModal from '@/core/modal/atoms/EditModal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { EditTaskProps } from './EditTask';

export const EditTask = ({
  isEditTaskModelOpen,
  setIsEditTaskModelOpen,
  task,
  onUpdate,
  status,
  statuses,
}: EditTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [due, setDue] = useState(task.due);
  const [selectedStatusId, setSelectedStatusId] = useState(task.statusId);
  const [pictureUrl, setPictureUrl] = useState(task.pictureUrl);

  const statusValue = statuses.map((status) => ({
    value: status._id,
    label: status.description,
  }));
  const defaultStatusValue = {
    value: statusId,
    label: status,
  };

  return (
    <div>
      {createPortal(
        <EditModal
          title='Edit Task'
          isOpen={isEditTaskModelOpen}
          onClose={() => setIsEditTaskModelOpen(false)}
          description='Edit the task details'
        >
          <div className='flex flex-col gap-y-2'>
            <SimpleInput
              id='title'
              label='Title'
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <SimpleInput
              id='description'
              label='Description'
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
            <SimpleInput
              id='pictureUrl'
              label='Picture URL'
              value={pictureUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPictureUrl(e.target.value)
              }
            />
            <div>
              <label
                className={`text-md text-gray-800 duration-300 top-1.5 left-2 px-1 peer-focus:text-blue-600`}
                htmlFor='status'
              >
                Status
              </label>
              <Select
                id='status'
                name='Status'
                defaultValue={defaultStatusValue}
                options={statusValue}
                className='rounded-xl'
                menuPosition='fixed'
                onChange={(value: any) => setSelectedStatusId(value.value)}
              />
            </div>
          </div>
        </EditModal>,
        document.getElementById('root') as HTMLElement,
      )}
    </div>
  );
};
