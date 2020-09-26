import request from '../utils/axios';

export const albumDetail = (id) => request.request({
    method: 'GET',
    url: '/album',
    params: {
        id
    }
})

export const albumComments = (id) => request.request({
    method: 'GET',
    url: '/comment/album',
    params: {
        id
    }
})