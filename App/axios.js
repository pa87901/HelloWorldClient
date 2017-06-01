import axios from 'axios'
import { AsyncStorage } from 'react-native';


console.log('axios async')
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// AsyncStorage.getItem('authToken', (err, data) => {
//   if(data){
//     axios.defaults.headers.common['Authorization'] = JSON.parse(data).idToken;
//   }
// })

var axiosMain = axios.create({
  baseURL: 'http:/localhost:3000/api/',
  timeout: 1000,
  headers: {
    'access-control-allow-origin': '*'
  }
});


export default axiosMain;
