import request from '../utils/axios';

export const userLogin = (phone, password) => request.request({
    method: 'POST',
    url: '/login/cellphone',
    params: {
        phone,
        password
    }
})

export const checkLogin = () => request.request({
    method: 'GET',
    url: '/login/status'
})

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

export const userLogout = () => request.request({
    method: 'POST',
    url: '/logout'
})