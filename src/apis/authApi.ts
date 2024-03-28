import {appInfo} from '../constants/appInfors';
import axiosClient from './axiosClient';
class AuthAPI {
  HandleAuthentication = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete'
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/auth${url}`, {
      method: method ?? 'get',
      data,
    });
  };
  HandleUpdateUser = async (
    url: string,
    formData: FormData,
    method: 'post' | 'put'
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/auth${url}`, {
      method: method,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;
