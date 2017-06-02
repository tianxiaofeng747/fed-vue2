<template>
    <div>
        <region-picker :province="province" @onchange="change" :city="city" :district="district"></region-picker>
    </div>
</template>
<script type="text/javascript">

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

        },
        methods: {
           
        },
        mounted() {

        }
    }
</script>