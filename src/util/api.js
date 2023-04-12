// 是否可以打开页面
let openView = true;
export const api = {
    /**
     * 获取储存值
     * @param {string} info
     */
    getInfo (info) {
        if (!info) return false;

        let data = uni.getStorageSync(info)

        if (data !== '' && data) {
            return data
        }
        return data
    },
    /**
     * @description 移除储存值
     * @param {string} key 储存的key
     */
    removeInfo (key) {
        uni.removeStorageSync(key)
    },
    /**
     * 设置储存值
     * @param {string} key 储存时的key
     * @param {any} val 储存时的值
     */
    setInfo (key, val) {
        uni.setStorageSync(key, val)
    },
    /**
     * 弹窗toast
     * @param {object} obj 
     * @param {string} icon 显示icon
     * @param {string} title 显示内容
     * @param {Number} duration 显示时间
     * @param {string} image 显示图片- 等级比icon高
     */
    toast (obj) {
        uni.showToast({
            icon: obj.icon || 'none',
            title: obj.title || obj,
            duration: obj.duration || 1000,
            position: obj.image ? '' : (obj.position || 'center'),
            image: obj.image || ''
        })
    },
    /**
     * load 提示文字
     * @param {string} title 标题
     * @param {Number} time 时间
     */
    async showLoad (title = '', time = 0) {
        api.hideLoad()
        uni.showToast({
            title: title || '加载中...',
            duration: time || 2000
        });
    },
    /**
     * load 隐藏
     */
    hideLoad () {
        uni.hideToast();
    },
    /**
     * loading 
     * @param {string} title showLoading 显示加载中
     * @param {*} hideLoading 隐藏
     */
    showLoading (title) {
        uni.showLoading({
            title: title || '加载中'
        })
    },
    hideLoading () {
        uni.hideLoading()
    },
    /**
     * 获取页面参数(包括其他页面)
     * @param {Number} n 默认为 1
     */
    getData (n = 1) {
        return { ...getCurrentPages()[getCurrentPages().length - n].options }
    },
    /**
     * 页面跳转
     * @param {String} url 为跳转的路径
     * @param {Object} data 为页面跳转时携带的参数
     * @param {Boolean} replace 为是否关闭当前页面 默认为false
     */
    async jump (url, data = {}, replace = false) {
        if (!url) return console.error('跳转路径为必须')
        // url 是否包含 ？
        const jumpUrl = url + api.objToStr(data, !url.includes('?'))

        // 是否可以跳转 防止多次跳转
        if (!openView) return false
        openView = false

        // url !== viewName.bindPhone && api.showLoad()

        replace && await uni.redirectTo({
            url: jumpUrl
        })

        !replace && await uni.navigateTo({
            url: jumpUrl
        })

        api.hideLoad()

        openView = true
    },
    /**
     * 延迟函数
     * @param {Number} 默认为 1.5*1000
     */
    timeOut (time = (1.5 * 1000)) {
        return new Promise((resolve, reject) => {
            const myTime = setTimeout(() => {
                clearTimeout(myTime)
                resolve(true)
            }, time)
        })
    },
    /**
     * @returns 获取当前页面路由
     */
    getRoute () {
        return getCurrentPages()[getCurrentPages().length - 1].route
    },
    /**
     * 字符串转对象
     * @param {string} data
     */
    strToObj (data) {
        let info = {}
        data.split('&').forEach(item => {
            const [key, value] = item.split('=')
            info[key] = value
        })
        return info
    },
    /**
     * 对象转字符串
     */
    objToStr (data, start = true) {
        let info = start ? "?" : "";
        for (let key in data) {
            if (key) {
                info += `${key}=${data[key]}&`
            }
        }
        return info.slice(0, -1);
    },
    /**
     * 操作反馈
     * @param {obj.title} obj 提示标题
     * @param {string,function} url 字符串或为方法 跳转的路径
     */
    async tipsBack (obj, url = '') {
        let my_title, my_content = '';
        if (!obj && !obj.content) {
            console.error('内容为必填')
            return false
        }
        if (typeof obj === 'string') {
            my_content = obj
        } else {
            const { title, content } = obj
            my_title = title
            my_content = content
        }

        await uni.showModal({
            title: my_title || '温馨提示',
            content: my_content,
            showCancel: false //是否显示取消按钮
        })
        api.showLoad()
        /**
         * 如果是方法 function
         */
        if (typeof url === 'function') {
            api.hideLoad()
            url()
            return false
        }
        /**
         * 指定页面
         */
        if (url) {
            uni.reLaunch({ url })
            api.hideLoad()
            return false
        }
        // 返回上级页面
        if (getCurrentPages().length > 1) {
            uni.navigateBack()
        }
        api.hideLoad()
    },
    /**
     * 
     * @param {string} url 下载的url链接下载并保存本地
     * @returns 
     */
    async downImage (url) {
        const [error, { tempFilePath }] = await uni.downloadFile({ url }).catch()
        if (!tempFilePath || error) {
            return false;
        }
        const [saveErr, { savedFilePath }] = await uni.saveFile({ tempFilePath }).catch()
        // 下载并保存本地
        api.setInfo(url, savedFilePath);

    }
}

export let flag = process.env.NODE_ENV === `development`;
/* 正式环境 */
// export let flag = false;
// 测试环境
// export let flag = true;