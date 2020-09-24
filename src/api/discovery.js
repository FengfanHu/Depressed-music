import request from '../utils/axios';

export const recommend = () => request.request({
    method: 'GET',
    url: '/banner',
    params: {
        type: 0
    }
})

export const personalizedList = () => request.request({
    method: 'GET',
    url: '/personalized',
    params: {
        limit: 10
    }
})

export const personalizedNewSong = () => request.request({
    method: 'GET',
    url: '/personalized/newsong'
})

export const newAlbum = () => request.request({
    method: 'GET',
    url: '/top/album',
    params: {
        limit: 10
    }
})