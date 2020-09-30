import request from '../utils/axios';

export const songDetail = (ids) => request.request({
    method: 'GET',
    url: '/song/detail',
    params: {
        ids
    }
})

export const songComments = (id) => request.request({
    method: 'GET',
    url: '/comment/music',
    params: {
        id
    }
})

export const getLyric = (id) => request.request({
    method: 'GET',
    url: '/lyric',
    params: {
        id
    }
})

export const songUrl = (id) => request.request({
    method: 'GET',
    url: '/song/url',
    params: {
        id
    }
})