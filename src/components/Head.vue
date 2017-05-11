<template>
    <div class="head">
        <h1 class="logo">供应链云平台</h1>
        <div>
            <div class="head-user">
                <img  src="../assets/images/3.png" alt="">欢迎您，<span id="J_userName">{{msg}}</span>
            </div>
            <div  @click="refresh">清理缓存</div> 
            <div  @click="signOut"><MessageBox title="退出" type="info" message="确定退出吗?">退出</MessageBox></div>
        </div>
    </div>
</template>

<script>
import MessageBox from '@/components/MessageBox'
export default {
    name: 'head',
    data () {
        return {
            msg: '供应链云平台'
        }
    },
    components:{
        MessageBox
    }
}
</script>

<style lang="scss" scoped>
    .head{
        height: 50px;
        line-height: 50px;
        background-color: #1da7b5;
        font-size: 14px;
        color: #fff;
        & h1{
            width: 310px;
            height: 50px;
            margin: 0 0 0 10px;
            text-indent: -9999px;
            background: url(../assets/images/scm_logo.png) no-repeat;
            cursor: pointer;
            font-size: 32px;
            float: left;
        }
        & div{
            float: right;
            & div{
                border-left: 1px solid #3bbbc9;
                float: left;
                padding: 0 20px;
                &.head-user{
                    position: relative;
                    img{
                        display: block;
                        width: 32px;
                        height: 32px;
                        background-color: #f1f1f2;
                        border-radius: 50%;
                        margin-top: 10px;
                        margin-right: 10px;
                        overflow: hidden;
                        float: left;
                    }
                    span{
                        &:nth-of-type(1){
                            font-weight: bold;
                            cursor: pointer;
                        }
                        &:nth-of-type(2){
                            position: absolute;
                            left: 66px;
                            top: 18px;
                            font-size: 12px;
                        }
                    }
                }
            }

        }
    }

</style>
