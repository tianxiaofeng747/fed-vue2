<template>
    <div>
        <File-upload :ile-list.sync="list"></File-upload>
        <button @click="submit">tijiao</button>
    </div>

</template>
<script type="text/javascript">
    import FileUpload from '@/components/FileUpload';
    export default{
        data(){
            return {
                list:[
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'thumbnail': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                        'fullUrl': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'thumbnail': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
                        'fullUrl': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ]
            }
        },
        components:{
            FileUpload
        },
        methods:{
            submit(){
                console.log(this.list);
            }
        },
        mounted(){

        }
    }
</script>