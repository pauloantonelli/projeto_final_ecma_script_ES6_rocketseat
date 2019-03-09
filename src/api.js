import axios from 'axios';

const api = axios.create({
    baseURL: 'http://viacep.com.br'
})

export default api;