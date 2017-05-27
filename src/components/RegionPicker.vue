<template>
    <div>
        <region-picker :province="province" :city="city" :district="district"></region-picker>
    </div>
</template>
<script type="text/javascript">
    import RegionPicker from 'vue-region-picker'
    import REGION_DATA from 'china-area-data'
    RegionPicker.region = REGION_DATA
    export default {
        name:'regionPicker',
        data() {
            return {
                province: '广东', // you can set initial value or not.
                city: 440100, // by code or name.
                district: ''
            }
        },
        components: {
            RegionPicker
        },
        methods: {
           
        },
        mounted() {

        }
    }
</script>