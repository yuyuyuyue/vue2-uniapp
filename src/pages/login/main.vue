<template>
    <view class="content">
     
    </view>
</template>
<script>
import { api } from '@/util/api'
export default {
    data () {
        return {
            myroute: '' || '我的',
            path: '' || '/pages/index/index'
        }
    },
    mounted () {
        api.showLoad('可以', 1000)
    },
    computed: {
        myroute_c () {
            return api.getRoute()
        },
        myData () {
            return api.getData()
        }
    },
    onShow () {
        console.log('login页面')
    },
    methods: {
        btnClick () {
            api.jump(this.path, { index: 1, name: '张三' })
        }
    }
}
</script>