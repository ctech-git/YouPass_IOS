import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.youpass.portalctech.com.br'
});

export default api;