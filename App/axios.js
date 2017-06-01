import axios from 'axios'
import { AsyncStorage } from 'react-native';


var axiosMain = axios.create({
  baseURL: 'http:/localhost:3000/api/',
  timeout: 1000,
  headers: {
    'access-control-allow-origin': '*'
  }
});


export default axiosMain;
