import {appInfo} from '../constants/appInfors';
import axiosClient from './axiosClient';
import FormData from 'form-data';
class SocialAPI {
  HandleSocial = async (
    url: string,
    formData: FormData, // Thêm đối số formData kiểu FormData
    method?: 'get' | 'post' | 'put' | 'delete'
  ) => {
    const headers = {
      'Content-Type': 'multipart/form-data', // Đặt header 'Content-Type' cho dữ liệu form-data
    };

    return await axiosClient(`${appInfo.BASE_URL}/social${url}`, {
      method: method ?? 'get',
      data: formData, // Sử dụng formData thay vì data
      headers: {
        ...headers, // Thêm headers được truyền vào
        'Content-Type': 'multipart/form-data', // Đặt header 'Content-Type' cho dữ liệu form-data
      }, // Thêm headers vào request
    });
  };
}

const socialAPI = new SocialAPI();
export default socialAPI;
