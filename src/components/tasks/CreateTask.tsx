import DefaultButton from '@/core/buttons/electrons/DefaultButton';
import SimpleInput from '@/core/inputs/SimpleInput';
import CreateModal from '@/core/modal/atoms/CreateModal';
import TaskService from '@/services/task';
import { Status } from '@/services/task/types';
import { showError, showSuccess } from '@/utils/helpers';
import { ApiError } from '@/utils/plugins/types/ApiResponse';
import axios from 'axios';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Label, labels } from '@/constants/labels';

interface CreateTaskProps {
  isCreateTaskModelOpen: boolean;
  setIsCreateTaskModelOpen: (isOpen: boolean) => void;
  status: string;
  statusId: string;
  statuses: Status[];
  onUpdate: () => void;
}

const CreateTask = ({
  isCreateTaskModelOpen,
  setIsCreateTaskModelOpen,
  status,
  statusId,
  statuses,
  onUpdate,
}: CreateTaskProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [selectedStatusId, setSelectedStatusId] = useState(statusId);
  const [label, setLabel] = useState<Label | null>(null);
  const [due, setDue] = useState(new Date());

  const createTask = () => {
    TaskService.create({
      title,
      description,
      due,
      statusId: selectedStatusId,
      pictureUrl,
      label: label?.label,
      labelColor: label?.labelColor || labels[0].labelColor,
    })
      .then((response) => {
        if (response.data.message) {
          showSuccess(response.data.message);
        }
        setIsCreateTaskModelOpen(false);
        setTitle('');
        setDescription('');
        setPictureUrl('');
        setLabel({ label: '', labelColor: '#5051F9' });
        setDue(new Date());
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

  const statusValue = statuses.map((status) => ({
    value: status._id,
    label: status.description,
  }));
  const defaultStatusValue = {
    value: statusId,
    label: status,
  };
  const onClose = () => {
    setIsCreateTaskModelOpen(false);
    setTitle('');
    setDescription('');
    setPictureUrl('');
    setLabel(null);
    setDue(new Date());
  };

  return (
    <div>
      {createPortal(
        <CreateModal
          title={`Create Task`}
          isOpen={isCreateTaskModelOpen}
          onClose={onClose}
          otherButtons={[
            <DefaultButton
              rounded='rounded-xl'
              bgColor='bg-white'
              bgColorHover='hover:bg-gray-200'
              border='border border-gray-600'
              textColor='text-gray-600'
              onClick={() => setIsCreateTaskModelOpen(false)}
              label='Close'
            />,
            <DefaultButton
              rounded='rounded-xl'
              bgColor='bg-emerald-600'
              onClick={createTask}
              label='Save'
              bgColorHover='hover:bg-emerald-700'
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
              value={pictureUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPictureUrl(e.target.value)
              }
            />
            <div className='flex flex-row justify-left gap-x-4 items-center'>
              <div>
                <label
                  className={`text-md text-gray-800 duration-300 top-1.5 left-2 px-1 peer-focus:text-blue-600`}
                  htmlFor='label'
                >
                  Status
                </label>
                <Select
                  id='label'
                  name='Label'
                  defaultValue={{label: '', labelColor: '#5051F9'}}
                  options={labels}
                  className='rounded-xl'
                  menuPosition='fixed'
                  onChange={(value: any) => {setLabel(value)}}
                />
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
        </CreateModal>,
        document.getElementById('root') as HTMLElement,
      )}
    </div>
  );
};

export default CreateTask;
