<template>
    <div>
        <File-upload :file-list.sync="list" max=2></File-upload>
        <button @click="submit">tijiao</button>
    </div>
</template>
<script type="text/javascript">
    import FileUpload from '@/components/FileUpload';
    export default{
        data(){
            return {
                list:[
                   's2/M00/25/26/rB4r9VkePZOAaA6cAAWyhJ07vXM148.jpg'
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