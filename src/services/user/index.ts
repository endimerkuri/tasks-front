import API from '@/utils/plugins/API';
import { ApiResponse } from '@/utils/plugins/types/ApiResponse';
import { UserData } from './types';

const UserService = {
  getUserMe(): Promise<
    ApiResponse<{
      user: UserData;
    }>
  > {
    return API.get('/users/me');
  },

  updateUserMe(payload: UserData): Promise<
    ApiResponse<{
      user: UserData;
    }>
  > {
    return API.put('/users/me', payload);
  },
};

export default UserService;
