<template>
    <div>
        <File-upload :file-list.sync="list" max=2></File-upload>
        <button @click="submit">tijiao</button>
        <div>
            <p>{{count}}</p>
            <input type="number" v-model="step"/>
            <Button type="primary" @click="add">+</Button>
        </div>
    </div>
</template>
<script type="text/javascript">
    import FileUpload from '@/components/FileUpload';
    import regionPicker from '@/components/RegionPicker';
    import { mapMutations } from 'vuex';

    import {CHANGE_NUM} from '@/store/mutation-types.js';
    export default{
        data(){
            return {
                list:[
                   's2/M00/25/26/rB4r9VkePZOAaA6cAAWyhJ07vXM148.jpg'
                ],
                step: 0, // you can set initial value or not.
                city: 440100, // by code or name.
                district: ''
            }
        },
        computed:{
            count: function () {
                return this.$store.state.count;
            }
        },
        components:{
            FileUpload,
            regionPicker
        },
        methods:{
            ...mapMutations([
                CHANGE_NUM
            ]),
            add(){
                if(this.step>0){
                    this.CHANGE_NUM(Number(this.step));
                }
            },
            submit(){
                console.log(this.list);
            }
        },
        mounted(){

        }
    }
</script>