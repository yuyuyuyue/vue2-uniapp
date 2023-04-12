import { api, flag } from './api.js'
/**
 * 接口地址
 * @param {baseURL} 测试地址 生产地址
 * @param {qiBaseUrl} 图片上传地址
 */
export const flag = process.env.NODE_ENV === 'development'

if (flag) {
    console.log('测试环境-------------------------')
    console.log('测试环境-------------------------')
    console.log('测试环境-------------------------')
    console.log('测试环境-------------------------')
} else {
    console.log('正式环境-------------------------')
    console.log('正式环境-------------------------')
    console.log('正式环境-------------------------')
    console.log('正式环境-------------------------')
}
export const qiBaseUrl = '图片上传地址'

export const baseURL = '请求地址'
/**
* request
* @param {string} url 请求时路径
* @param {object} data 请求时参数
* @param {string} model 请求时类型
*/
export const request = (url, data, host, model = "POST") => {
    if (!url) return;
    const header = {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        // "content-Type": "application/json",
    }
    
    api.getInfo('token') && (data.token = api.getInfo('token')) 

    return new Promise((resolve, reject) => {
        uni.request({
            url: (host ? host : baseURL) + url,
            method: model,
            sslVerify: false,
            data,
            header,
            timeout: 60000,
            dataType: 'json',
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
/**
 * 上传文件 /upload_test
 */
export const upload = {
    post: (url, file, name) => {
        const header = {
            "content-type": "multipart/form-data"
        }
        return new Promise((resolve, reject) => {
            uni.uploadFile({
                url: url || baseURL + '/upload_test',
                filePath: file,
                name: name || 'file',
                header,
                timeout: 60000,
                formData: {
                    "token": api.getInfo('token') || ""
                },
                success: (res) => {
                    resolve(res)
                },
                complete: (err) => {
                    reject(err)
                }
            })
        })
    }
}
