<template>
    <ul class="menu" :style="{minHeight:clientHeight+'px'}">
        <li v-for="(items, index) in menuList">
            <div @click="showSon(items)">
                <i class="iconfont" :class="items.icon"></i>
                <span>{{items.name}}</span>
            </div>
           <div  v-for="(item, index) in items.son" class="sonList" v-show="items.show" >
                <span>{{item.name}}</span>
                <span>{{item.hide}}</span> 
           </div>
        </li>
    </ul>
</template>

<script>
import menu from '../data/menu.json'
export default {
    name: 'sidebar',
    data () {
        return {
            menuList : menu,
            clientHeight:''
        }
    },
    mounted(){
        this.clientHeight=document.body.clientHeight-50;
        console.log(this.clientHeight);
    },
    methods :{
        showSon(item){
            this.$set(item,'show',!item.show)
        }
    }
    
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .menu{
        width: 160px;
        line-height: 50px;
        font-size: 14px;
        border-bottom: 1px solid #4a4a5a;
        cursor: pointer;
        background-color: #59596d;
        li{
            div{
                &:nth-of-type(1){
                    i{
                        color:#fff;
                        font-size: 17px;
                        margin:0 7px 0 15px;
                    }
                    border-bottom: 1px solid #4a4a5a;
                    span{
                        color:#fff;
                        font-size: 16px;
                    }
                    &:hover{
                        background:rgba(29, 167, 181, 0.73);
                    }
                }
                &.sonList{
                    padding-left: 42px;
                    &:hover{
                        background:rgba(2, 167, 181, 0.73);
                    }
                    span{
                        color: #CC1;
                    }
                }
               

            }
            
        }
        .hide{
            display:none;
        }
    }


</style>