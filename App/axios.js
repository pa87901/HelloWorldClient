import axios from 'axios';
//import { AsyncStorage } from 'react-native';


const axiosMain = axios.create({
// Uncomment line 7 and comment line 8 for local host - Stripe won't work.
  baseURL: 'http://localhost:3000/',
  // baseURL: 'https://localizetravel-staging.herokuapp.com/',
  timeout: 5000,
  headers: {
    'access-control-allow-origin': '*'
  }
});

export default axiosMain;
