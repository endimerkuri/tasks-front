import React, { useEffect, useState } from 'react';
import Input from '../../core/inputs/Input';
import DefaultButton from '../../core/buttons/electrons/DefaultButton';
import PasswordInput from '../../core/inputs/PasswordInput';
import { LoginFormSchema } from '../../utils/validators/LoginSchema';
import { showError, showSuccess } from '../../utils/helpers';
import AuthService from '../../services/auth';
import axios from 'axios';
import { ApiError } from '../../utils/plugins/types/ApiResponse';
import { addAuth, tokenSelector } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/svg/logo-dark.svg';
import { Link, useNavigate } from '@tanstack/react-router';
import { addMe } from '@/redux/slices/me';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(tokenSelector);

  useEffect(() => {
    if (accessToken) {
      navigate({ to: '/' });
    }
  }, [accessToken]);

  const onClick = () => {
    const result = LoginFormSchema.safeParse({
      username,
      password,
    });

    if (!result.success) {
      setErrors({
        username:
          result.error.errors.find((error) => error.path[0] === 'username')
            ?.message || '',
        password:
          result.error.errors.find((error) => error.path[0] === 'password')
            ?.message || '',
      });
      showError('Please check form for errors');
      return;
    }

    setErrors({ username: '', password: '' });
    const payload = {
      username: username,
      password: password,
    };
    AuthService.login(payload)
      .then((response) => {
        if (response.data.message) {
          showSuccess(response.data.message);
        }
        const { authentication, user } = response.data.data;
        dispatch(addAuth(authentication));
        dispatch(addMe(user));
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
      onClick();
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
        <DefaultButton label='Log in' onClick={onClick} />
        <div className='flex flex-row mt-4 text-sm items-center align-middle justify-center'>
          <p> Don't have an account? </p>
          <Link to='/signup'>
            <p className='hover:underline text-[#0062A5] ml-1 font-semibold hover:cursor-pointer hover:scale-[0.95] transition-transform duration-300 ease-in-out'>
              {'Sign Up!'}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
