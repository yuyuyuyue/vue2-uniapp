import { request } from '../util/requery.js'
// 此文件为api入口文件
const http = uni.$u.http

export const getLook = (data = {}) => http.get('/get', { params: data })

export const getLook2 = (data = {}) => request('/get', data, 'url')