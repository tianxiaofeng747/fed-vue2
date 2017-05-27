<template>
    <div>
        <File-upload :file-list.sync="list" max=2></File-upload>
        <button @click="submit">tijiao</button>
        <region-picker></region-picker>
    </div>
</template>
<script type="text/javascript">
    import FileUpload from '@/components/FileUpload';
    import regionPicker from '@/components/RegionPicker';
    export default{
        data(){
            return {
                list:[
                   's2/M00/25/26/rB4r9VkePZOAaA6cAAWyhJ07vXM148.jpg'
                ],
                province: '广东', // you can set initial value or not.
                city: 440100, // by code or name.
                district: ''
            }
        },
        components:{
            FileUpload,
            regionPicker
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