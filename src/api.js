import axios from 'axios';

const api = axios.create({
    baseURL: 'https://github.com/reaapunzell/cashzen-api', 
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;
