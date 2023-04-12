<template>
    <view>
        {{message}}
        <view class="tabbar">

        </view>
    </view>
</template>
<style lang="scss" scoped>
.tabbar {
    position: fixed;
    bottom: 0;
    z-index: 10;
    height: 100rpx;
    width: 750rpx;
    display: flex;
    justify-content: center;
    align-content: center;
    box-shadow: 0 0 5rpx black;
}
</style>
<script>
export default {
    name:'Index',
    data(){
        return{
            message:'单页面'
        }
    }
}
</script>