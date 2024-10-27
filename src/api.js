import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cashzen-api.onrender.com/', 
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;
