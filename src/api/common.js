import request from '../utils/axios';

export const playlistDetail = (id) => request.request({
    method: 'GET',
    url: '/playlist/detail',
    params: {
        id
    }
})

export const albumDetail = (id) => request.request({
    method: 'GET',
    url: '/album',
    params: {
        id
    }
})

export const songDetail = (ids) => request.request({
    method: 'GET',
    url: '/song/detail',
    params: {
        ids
    }
})

export const getLyric = (id) => request.request({
    method: 'GET',
    url: '/lyric',
    params: {
        id
    }
})