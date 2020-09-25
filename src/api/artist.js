import request from '../utils/axios';

export const artistDetail = (id) => request.request({
    method: 'GET',
    url: '/artists',
    params: {
        id
    }
})

export const artistAlbum = (id) => request.request({
    method: 'GET',
    url: '/artist/album',
    params: {
        id
    }
})

export const artistDesc = (id) => request.request({
    method: 'GET',
    url: '/artist/desc',
    params: {
        id
    }
})

export const artistMV = (id) => request.request({
    method: 'GET',
    url: '/artist/mv',
    params: {
        id
    }
})