import axios from 'axios';

const apiFinger = axios.create({
    baseURL: 'https://static.traycheckout.com.br/'
});

export default apiFinger;