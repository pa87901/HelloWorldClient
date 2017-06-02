import axios from 'axios';
import { AsyncStorage } from 'react-native';


var axiosMain = axios.create({
  baseURL: 'http://35.167.135.24:3000/',
  timeout: 1000,
  headers: {
    'access-control-allow-origin': '*'
  }
});



export default axiosMain;
