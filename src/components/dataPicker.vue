<template>
    <Date-picker ref="datepicker" :class="$width" :type="$type" :placeholder="$placeholder" style="width: 200px" format="yyyy-MM-dd" @on-change="dateChangeTime" ></Date-picker>
</template>
<script>
    export default {
        name:'datepicker',
        data(){
            return {
                
            }
            
        },
        //需要传的参数 //date、daterange、datetime、datetimerange、year、month
        props:['$type','$placeholder','$width'],
        methods:{
            dateChangeTime(val) {
                if(this.$type=="daterange"){
                    //this.$refs.datepicker.dataset.startTime=val[0]
                    //this.$refs.datepicker.dataset.endTime=val[1]
                    this.$emit('changeTime',val)
                }
                console.log(this.$type)
                
            }
        }
    }
</script>
