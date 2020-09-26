import request from '../utils/axios';

export const playlistDetail = (id) => request.request({
    method: 'GET',
    url: '/playlist/detail',
    params: {
        id
    }
})

export const playlistComments = (id) => request.request({
    method: 'GET',
    url: '/comment/playlist',
    params: {
        id
    }
})