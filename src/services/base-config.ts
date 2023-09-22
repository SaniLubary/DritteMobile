import axios from 'axios';
import Config from 'react-native-config';
import { locallyRetrieveToken } from './local-auth-service';

async function getAxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: Config.BACK_URI,
    timeout: 5000,
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${await getToken()}`;
  return axiosInstance
}

async function getToken() {
  return await locallyRetrieveToken().then(token => token?.idToken)
}

export default getAxiosInstance;
