import API from '../../utils/plugins/API';
import { ApiResponse } from '../../utils/plugins/types/ApiResponse';
import { LoginPayload, SignupPayload } from './types';

const AuthService = {
  login(payload: LoginPayload): Promise<
    ApiResponse<{
      authentication: {
        accessToken: string;
      };
    }>
  > {
    return API.post('/auth/login', payload);
  },

  signup(payload: SignupPayload): Promise<
    ApiResponse<{
      user: any;
    }>
  > {
    return API.post('/auth/register', payload);
  },
};

export default AuthService;
