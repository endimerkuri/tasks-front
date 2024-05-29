import DefaultButton from '@/core/buttons/electrons/DefaultButton';
import SimpleInput from '@/core/inputs/SimpleInput';
import EditModal from '@/core/modal/atoms/EditModal';
import useClickOutside from '@/hooks/useClickOutside';
import TaskService from '@/services/task';
import { Status, Task } from '@/services/task/types';
import { showError, showSuccess } from '@/utils/helpers';
import { ApiError } from '@/utils/plugins/types/ApiResponse';
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { createPortal } from 'react-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EditTaskProps {
  showModal: boolean;
  setShowModal: (isOpen: boolean) => void;
  task: Task;
  onUpdate: () => void;
  status: string;
  statuses: Status[];
}

const EditTask = ({
  showModal,
  setShowModal,
  task,
  onUpdate,
  status,
  statuses,
}: EditTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [selectedStatusId, setSelectedStatusId] = useState(task.status);
  const [pictureUrl, setPictureUrl] = useState(task.pictureUrl);
  const [label, setLabel] = useState(task.label);
  const [labelColor, setLabelColor] = useState(task.labelColor || '#5051F9');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [due, setDue] = useState(new Date());
  const popover = useRef(null);
  const close = useCallback(() => setIsPickerOpen(false), []);
  useClickOutside(popover, close);

  const statusValue = statuses.map((status) => ({
    value: status._id,
    label: status.description,
  }));
  const defaultStatusValue = {
    value: task.status,
    label: status,
  };

  const editTask = () => {
    TaskService.edit(
      {
        title,
        description,
        statusId: selectedStatusId,
        pictureUrl,
        label,
        labelColor,
      },
      task._id,
    )
      .then((response) => {
        if (response.data.message) {
          showSuccess(response.data.message);
        }
        setShowModal(false);
        onUpdate();
      })
      .catch((err: ApiError) => {
        if (axios.isAxiosError<ApiError>(err)) {
          if (err.response?.data) {
            const { message } = err.response.data;
            return showError(message);
          }
        }
      });
  };

  const deleteTask = () => {
    TaskService.delete(task._id)
      .then((response) => {
        if (response.data.message) {
          showSuccess(response.data.message);
        }
        setShowModal(false);
        onUpdate();
      })
      .catch((err: ApiError) => {
        if (axios.isAxiosError<ApiError>(err)) {
          if (err.response?.data) {
            const { message } = err.response.data;
            return showError(message);
          }
        }
      });
  };

  return (
    <div>
      {createPortal(
        <EditModal
          title='Edit Task'
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          description='Edit the task details'
          otherButtons={[
            <DefaultButton
              rounded='rounded-xl'
              bgColor='bg-white'
              bgColorHover='hover:bg-gray-200'
              border='border border-gray-600'
              textColor='text-gray-600'
              onClick={() => setShowModal(false)}
              label='Close'
            />,
            <DefaultButton
              rounded='rounded-xl'
              bgColor='bg-red-600'
              onClick={deleteTask}
              label='Delete'
              bgColorHover='hover:bg-red-700'
            />,
            <DefaultButton
              rounded='rounded-xl'
              bgColor='bg-blue-600'
              onClick={editTask}
              label='Save'
              bgColorHover='hover:bg-blue-700'
            />,
          ]}
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
              value={pictureUrl || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPictureUrl(e.target.value)
              }
            />
            <div className='flex flex-row justify-left gap-x-4 items-center'>
              <SimpleInput
                id='label'
                label='Label'
                value={label}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLabel(e.target.value)
                }
              />
              <div className='relative'>
                <label
                  htmlFor='labelColor'
                  className={`text-md text-gray-800 duration-300 top-1.5 left-2 px-1 peer-focus:text-blue-600`}
                >
                  Label Color
                </label>
                <div
                  className='w-10 h-10 mt-2 rounded-lg cursor-pointer'
                  id='labelColor'
                  style={{
                    backgroundColor: labelColor,
                  }}
                  onClick={() => setIsPickerOpen(true)}
                />
                {isPickerOpen && (
                  <div
                    className='absolute z-50 bottom-10 right-12'
                    ref={popover}
                  >
                    <HexColorPicker
                      color={labelColor}
                      onChange={(color) => setLabelColor(color)}
                    />
                  </div>
                )}
              </div>
              <DatePicker
                id='due'
                customInput={
                  <SimpleInput
                    id='due'
                    label='Due'
                    className='cursor-pointer'
                    value={due.toString()}
                  />
                }
                selected={due}
                onChange={(date: Date) => setDue(date)}
              />
            </div>
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

export default EditTask;
