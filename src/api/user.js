import request from '../utils/axios';

export const userDetail = (uid) => request.request({
    method: 'GET',
    url: '/user/detail',
    params: {
        uid
    }
})

export const userPlaylist = (uid) => request.request({
    method: 'GET',
    url: '/user/playlist',
    params: {
        uid
    }
})