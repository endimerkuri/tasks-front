import React, { useState } from 'react';
import Input from '../../core/inputs/Input';
import DefaultButton from '../../core/buttons/electrons/DefaultButton';
import PasswordInput from '../../core/inputs/PasswordInput';
import { showError, showSuccess } from '../../utils/helpers';
import AuthService from '../../services/auth';
import axios from 'axios';
import { ApiError } from '../../utils/plugins/types/ApiResponse';
import logo from '../../assets/svg/logo-dark.svg';
import { Link, useNavigate } from '@tanstack/react-router';
import { RegisterFormSchema } from '@/utils/validators/RegisterSchema';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const navigate = useNavigate();

  const onSubmit = () => {
    const result = RegisterFormSchema.safeParse({
      username,
      password,
      firstName,
      lastName,
      email,
    });

    if (!result.success) {
      setErrors({
        username:
          result.error.errors.find((error) => error.path[0] === 'username')
            ?.message || '',
        password:
          result.error.errors.find((error) => error.path[0] === 'password')
            ?.message || '',
        firstName:
          result.error.errors.find((error) => error.path[0] === 'firstName')
            ?.message || '',
        lastName:
          result.error.errors.find((error) => error.path[0] === 'lastName')
            ?.message || '',
        email:
          result.error.errors.find((error) => error.path[0] === 'email')
            ?.message || '',
      });
      showError('Please check form for errors');
      return;
    }

    setErrors({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
    });
    const payload = {
      username,
      password,
      firstName,
      lastName,
      email,
    };
    AuthService.signup(payload)
      .then((response) => {
        if (response.data.message) {
          showSuccess(response.data.message);
        }
        navigate({ to: '/' });
      })
      .catch((err) => {
        if (axios.isAxiosError<ApiError>(err)) {
          if (err.response?.data) {
            const { message } = err.response.data;
            return showError(message);
          }
        }
      });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <div>
        <div className='flex justify-around items-center mb-6'>
          <img src={logo} alt='Logo' className='w-64' />
        </div>
        <h2 className='text-center text-2xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
      </div>
      <div className='rounded-md shadow-sm -space-y-px'>
        <Input
          id='firstName'
          label='First Name'
          value={firstName}
          placeholder='first name'
          onKeyDown={onKeyDown}
          error={errors.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value);
            setErrors({ ...errors, username: '' });
          }}
        />
        <Input
          id='lastName'
          label='Last Name'
          value={lastName}
          placeholder='last name'
          onKeyDown={onKeyDown}
          error={errors.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value);
            setErrors({ ...errors, username: '' });
          }}
        />
        <Input
          id='username'
          label='Username'
          value={username}
          placeholder='username'
          onKeyDown={onKeyDown}
          error={errors.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
            setErrors({ ...errors, username: '' });
          }}
        />
        <Input
          id='email'
          label='Email'
          value={email}
          placeholder='email'
          onKeyDown={onKeyDown}
          error={errors.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setErrors({ ...errors, username: '' });
          }}
        />
        <div className='relative'>
          <div className='w-full mt-2'>
            <PasswordInput
              id='password'
              name='password'
              label='Password'
              placeholder='password'
              value={password}
              onKeyDown={onKeyDown}
              error={errors.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: '' });
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <DefaultButton type='submit' label='Sign Up' onClick={onSubmit} />
        <div className='flex flex-row mt-4 text-sm items-center align-middle justify-center'>
          <p> Already have an account? </p>
          <Link to='/'>
            <p className='hover:underline text-[#0062A5] ml-1 font-semibold hover:cursor-pointer hover:scale-[0.95] transition-transform duration-300 ease-in-out'>
              {'Log In!'}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
export default SignupForm;
