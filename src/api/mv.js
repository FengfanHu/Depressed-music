import request from '../utils/axios';

export const MVDetail = (id) => request.request({
    method: 'GET',
    url: '/mv/url',
    params: {
        id
    }
})

export const MVComments = (id) => request.request({
    method: 'GET',
    url: '/comment/mv',
    params: {
        id
    }
})