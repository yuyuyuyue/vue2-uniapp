// 根据uviewui请求封装请求 带拦截
import { api } from './api'
module.exports = (vm) => {
    uni.$u.http.setConfig(config => {
        let headers = {
            "content-type": "application/json" || "application/x-www-form-urlencoded"
        }
        const userToken = api.getInfo('token')
        userToken && (headers.token = userToken)

        config.baseURL = 'http://121.5.158.115:5555' // 默认路径
        config.timeout = 5000
        config.header = headers

        return config
    })
    // 请求拦截
    uni.$u.http.interceptors.request.use(config => {
        config.data = config.data || {}
        console.log('请求拦截', config)
        return config
    }, config => {
        return Promise.reject(config)
    })
    // 响应拦截
    uni.$u.http.interceptors.response.use(res => {
        if (res.data.code === 500) {
            uni.$u.toast('服务器错误')
        } else if (res.data.code === 401) {
            return uni.$u.toast('token过期')
        }
        console.log('请求响应', res)

        return res.data
    })
}
