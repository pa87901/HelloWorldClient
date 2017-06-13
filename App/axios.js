import axios from 'axios';
//import { AsyncStorage } from 'react-native';


const axiosMain = axios.create({
//  baseURL: 'http://35.167.135.24:3000/',
  baseURL: 'https://localizetravel-staging.herokuapp.com/',
  timeout: 5000,
  headers: {
    'access-control-allow-origin': '*'
  }
});

export default axiosMain;
