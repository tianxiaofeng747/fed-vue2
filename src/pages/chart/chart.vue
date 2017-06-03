<template>
    <section>
        <Row class="chart-container">
            <Col span="24">
            <div id="charts_top" ref="charts_top"></div>
            </Col>
            <Col span="8">
            <div id="charts_product">2</div>
            </Col>
            <Col span="8">
            <div id="charts_hospital">3</div>
            </Col>
            <Col span="8">
            <div id="charts_cert">4</div>
            </Col>
        </Row>
    </section>
</template>

<script>
import echarts from 'echarts'
export default {
    data(){
        return {
            charts_top:null,
            charts_product:null,
            charts_hospital:null,
            charts_cert:null,
            URL:{
                ORDERBYSUPPLIER : 'scm.homePage.orderBySupplier', // 订单趋势图
                SUPPLIERHOMEPAGE : 'scm.homePage.supplierHomePage', // 产品图
            }
        }
    },
    methods:{
        charts_line(){
            this.Http.post(this.URL.ORDERBYSUPPLIER,{params : {}}).then(function(msg){
                    console.log(msg)
            })
        },
        charts_pie(){
            this.Http.post(this.URL.SUPPLIERHOMEPAGE,{params : {}}).then(function(msg){
                    console.log(msg)
            })
        }
    },
    mounted(){
        this.charts_line();
        this.charts_pie();
    }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.chart-container {
    width: 100%;
    #charts_top {
        width: 100%;
        height: 600px
    }
    #charts_product {
        width: 100%;
        height: 300px
    }
    #charts_hospital {
        width: 100%;
        height: 300px
    }
    #charts_hospital {
        width: 100%;
        height: 300px
    }
}
</style>