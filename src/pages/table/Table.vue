<template>
    <section>
        <!--工具条-->
        <Row>
            <Col span="24" class="toolbar">
            <Form inline>
                <Form-item label="状态 : " :label-width="70">
                    <Select v-model="from.result.value" placeholder="请选择" class="w100 ">
                        <Option v-for="item in from.result.options" :label="item.label" :value="item.value" :key="item.value"></Option>
                    </Select>
                </Form-item>
                <Form-item>
                    <Input placeholder="客户名称" v-model="from.keywords" class="w300"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="getList({pageIndex:1})">查询</Button>
                </Form-item>
                <Form-item>
                    <Button @click="reset">重置 </Button>
                </Form-item>
            </Form>
            </Col>
            <Col span="24">
            <Table border :columns="columns" :data="tableDate"  style="width:100%"></Table>
            </Col>
            <Col span="24" class="toolbar">
            <pagination :total="total" :pageSize="pageSize" @getList="getList"></pagination>
            </Col>
            <Col span="24">
                <dailog $width="500" $title="添加" :$modal.sync="modal1">

                </dailog>
            </Col>
        </Row>
    </section>
</template>

<script>
import pagination from '@/components/pagination'
import dailog from '@/components/Dailog'
export default {
  name: 'table',
  data () {
    return {
      modal1: false,
      users: [],
      total: 0,
      pageSize: 20,
      pageIndex: 1,
      from: {
        result: {
          options: [{
            value: -1,
            label: '全部'
          },
          {
            value: 3,
            label: '待审核'
          },
          {
            value: 1,
            label: '已通过'
          },
          {
            value: 4,
            label: '被拒绝'
          },
          {
            value: 6,
            label: '被解除'
          }],
          value: -1
        },
        keywords: ''
      },
      columns: [
        {
          title: '客户名称',
          key: 'customerName',
          width: 250
        },
        {
          title: '注册证',
          key: 'registNum',
          align: 'center',
          width: 110
        },
        {
          title: '生产厂家',
          key: 'factoryNum',
          align: 'center',
          width: 110
        },
        {
          title: '授权书',
          key: 'authorizeNum',
          align: 'center',
          width: 110
        },
        {
          title: '承诺书',
          key: 'commitNum',
          align: 'center',
          width: 110
        },
        {
          title: '业务员',
          key: 'entrustNum',
          align: 'center',
          width: 110
        },
        {
          title: '产品数量',
          key: 'productNum',
          align: 'center',
          sortable: true,
          width: 110
        },
        {
          title: '添加时间',
          key: 'applyTime',
          align: 'center',
          sortable: true,
          width: 110
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          width: 110
        },
        {
          title: '操作',
          key: 'oper',
          width: 110,


        }],
      tableDate: []

    }
  },
  computed: {
  },
  methods: {
    getList: function ({ pageIndex = this.pageIndex, pageSize = this.pageSize }) {
      let self = this
      this.Http.post('scm.supplier.queryCustomers',
        {
          'params': {
            'keywords': this.from.keywords,
            'orderBy': 'desc',
            'orderField': 'apply_time',
            'status': this.from.result.value,
            'pageIndex': pageIndex,
            'pageSize': pageSize
          }
        }).then(function (re) {
          console.log(re)
          self.pageIndex = re.data.pageIndex
          console.log(self.pageIndex)
          self.pageSize = re.data.pageSize
          self.total = re.data.total
          self.tableDate = re.data.rows
          .map((item, index) => {
            let s = `<ul class="customerName_content">
                      <li>
                        <img src="http://dfs.test.cloudyigou.com/dfs/s2/M00/25/39/rB4r9Vk3mwWAdctcAAFf5pjzdHU212_100x100.jpg" class="img_logo"/>
                      </li>
                      <li>
                        <p class="ellipsis">${item.customerName}</p>
                        <p><i class="iconfont icon-dianhua1"></i>${item.linkman}/${item.phone}</p>
                      </li>
                    </ul>`
            return {
              customerName: s
            }
          })
        })
    },
    open () {
      this.modal1 = true
    },
    reset () {
      this.pageIndex = 1
      this.from.keywords = ''
      this.from.result.value = -1
      this.getList({ pageIndex: '1' })
    }

  },
  mounted () {
    this.getList({})
  },
  components: {
    pagination,
    dailog
  }
}

</script>

<style  lang="scss">

.img_logo{
  width:60px;
  height:60px;
  border-radius: 50% ;
  box-shadow: 0px 0px 2px #ccc ;
  display: block
}
.customerName_content{
  li{
    &:nth-of-type(1){
      float:left;
      margin-right: 5px;
    }
    &:nth-of-type(2){
        position: relative;
        top: 5px;
    }
  }
}
.ivu-form-inline {
  .ivu-form-item {
    margin-right: 0px !important;
  }
}
</style>
