/**分页插件*/
<template>
    <Page :total="total" :page-size="pageSize" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total></Page>
</template>
<script>
    export default {
        name:'pagination',
        data(){
            return {
                size:this.pageSize
            }
            
        },
        //需要传的参数
        props:['total','pageSize'],
        methods:{
            changePage(page){
                this.$emit('getList', { pageIndex: page, pageSize: this.size })
            },
            changeSize(size){
                this.size=size;
                this.$emit('getList', { pageIndex: '1', pageSize: size })
            }
        }
    }
</script>
