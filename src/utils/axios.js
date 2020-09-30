import Axios from 'axios';

const request = Axios.create({
    baseURL: '/api',
    timeout: 15000
});

request.interceptors.request.use(function (config) {
    // Do something
    return config;
}, function (error) {
    return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

export default request;