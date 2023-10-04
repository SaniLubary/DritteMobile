import axios from 'axios';
import Config from 'react-native-config';
import { locallyRetrieveToken } from './local-auth-service';

async function getAxiosInstance() {
  try {
    const axiosInstance = axios.create({
      baseURL: Config.BACK_URI,
      timeout: 5000,
    });
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${await getToken()}`;
    return axiosInstance
  } catch (error) {
    console.error(error);
    throw error
  }
}

async function getToken() {
  try {
    return await locallyRetrieveToken()
    .then(token => {
      return token?.idToken
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default getAxiosInstance;
