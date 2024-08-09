import axios from 'axios';

const url = 'http://mcmpdemo.csesmzc.com:3000';

const createInstance = () => {
  return axios.create({
    baseURL: `${url}`,
    withCredentials: true,
  });
};

export const axiosInstance = createInstance(); //http://localhost:3000/test
export const dashboardInstance = createInstance(); // http://localhost:3000/dashboard
