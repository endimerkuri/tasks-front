import background from '@/assets/images/profileBackground.jpeg';
import SimpleInput from '@/core/inputs/SimpleInput';
import { addMe, initials, userData } from '@/redux/slices/me';
import UserService from '@/services/user';
import { showError, showSuccess } from '@/utils/helpers';
import { ApiError } from '@/utils/plugins/types/ApiResponse';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Settings = () => {
  const buttonClassName = `group flex flex-row items-center align-middle relative justify-center border font-medium rounded-xl py-3 px-4 focus:outline-none hover:scale-110 transition duration-300`;

  const userInitials = useSelector(initials);
  const user = useSelector(userData);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    UserService.getUserMe()
      .then((response) => {
        if (response.data.message) {
          const { user } = response.data.data;
          addMe(user);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setRole(user.role);
        }
      })
      .catch((err) => {
        if (axios.isAxiosError<ApiError>(err)) {
          if (err.response?.data) {
            const { message } = err.response.data;
            return showError(message);
          }
        }
      });
  },[]);

  const resetUserData = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setRole(user.role);
  };

  const saveUserData = () => {
    UserService.updateUserMe({
      firstName,
      lastName,
      email,
      role,
    })
      .then((response) => {
        if (response.data.message) {
          showSuccess(response.data.message);
          const { user: updatedUser } = response.data.data;
          addMe(updatedUser);
          setFirstName(updatedUser.firstName);
          setLastName(updatedUser.lastName);
          setEmail(updatedUser.email);
          setRole(updatedUser.role);
        }
      })
      .catch((err: ApiError) => {
        if (axios.isAxiosError<ApiError>(err)) {
          if (err.response?.data) {
            const { message } = err.response.data;
            return showError(message);
          }
        }
      })
  };

  return (
    <div className='p-12'>
      <div className='bg-white w-full pb-12'>
        <div
          className='w-full h-96'
          style={{
            backgroundImage: `url(${background})`,
          }}
        />
        <div className='px-16'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-x-14 items-start'>
              <div className='-mt-28'>
                <div className='bg-white rounded-full shadow-even p-3'>
                  <div className='bg-primary-10 rounded-full text-9xl font-bold text-gray-600 py-12 px-8 cursor-default'>
                    {userInitials}
                  </div>
                </div>
              </div>
              <div className='text-5xl font-semibold mt-10'>Settings</div>
            </div>
            <div className='flex flex-row mt-10 gap-x-4 items-start text-xl'>
              <button className={`${buttonClassName}`} onClick={resetUserData}>
                Cancel
              </button>
              <button
                className={`${buttonClassName} text-white bg-primary`}
                onClick={saveUserData}
              >
                Save
              </button>
            </div>
          </div>
          <div className='mt-10'>
            <div className='flex flex-row gap-x-4 text-xl text-gray-600'>
              <p className='cursor-pointer text-primary'>My details</p>
              <p className='cursor-pointer hover:text-primary'>Profile</p>
              <p className='cursor-pointer hover:text-primary'>Password</p>
              <p className='cursor-pointer hover:text-primary'>Team</p>
              <p className='cursor-pointer hover:text-primary'>Plan</p>
              <p className='cursor-pointer hover:text-primary'>Billing</p>
              <p className='cursor-pointer hover:text-primary'>Email</p>
              <p className='cursor-pointer hover:text-primary'>Notifications</p>
            </div>
          </div>
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-row gap-x-4 mt-10'>
              <SimpleInput
                id='firstName'
                label='First Name'
                placeholder={firstName || ''}
                value={firstName || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFirstName(e.target.value);
                }}
              />
              <SimpleInput
                id='lastName'
                label='Last Name'
                placeholder={lastName || ''}
                value={lastName || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className='w-1/6'>
              <SimpleInput
                id='email'
                label='Email'
                placeholder={email || ''}
                value={email || ''}
                icon={<FiMail className='w-6 h-6' />}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className='w-1/6'>
              <SimpleInput
                id='role'
                label='Role'
                placeholder={role || ''}
                value={role || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRole(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
