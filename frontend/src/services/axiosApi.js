import axios from 'axios';

// Crear una instancia de axios con la configuración base
const axiosApi = axios.create({
    baseURL: 'http://localhost:3010'
});

export default axiosApi;