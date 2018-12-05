import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = false;
const AUTH_TOKEN = window.localStorage.getItem('token');
if (AUTH_TOKEN) {
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
}

export default axios;