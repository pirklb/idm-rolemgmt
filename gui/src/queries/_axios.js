import axios from 'axios';

const backendAxios = axios.create({
    baseURL: '${import.meta.env.VITE_IDM_URL}',
    headers: { 'X-ApiKey': import.meta.env.VITE_API_KEY }
});

export default backendAxios;