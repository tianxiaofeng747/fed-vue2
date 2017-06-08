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
      <Table border :columns="columns" :data="tableDate" style="width:100%"></Table>
      </Col>
      <Col span="24" class="toolbar">
      <pagination :total="total" :pageSize="pageSize" @getList="getList"></pagination>
      </Col>
      <Col span="24">
      <dailog $width="500" $title="添加" :$modal.sync="modal1" @ok="ok">
        <Form ref="formValidate"  :rules="ruleValidate" :label-width="80" slot="content1">
          <Form-item label="姓名" prop="name">
            <Input  placeholder="请输入姓名"></Input>
          </Form-item>
          <Form-item label="邮箱" prop="mail">
            <Input  placeholder="请输入邮箱"></Input>
          </Form-item>
        </Form> 
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
          width: 350,
          render: (h, params) => {
            return (
              <ul class="customerName_content">
                <li>
                  <img src="http://dfs.test.cloudyigou.com/dfs/s2/M00/25/39/rB4r9Vk3mwWAdctcAAFf5pjzdHU212_100x100.jpg" class="img_logo" />
                </li>
                <li>
                  <p class="ellipsis">{params.row.customerName}</p>
                  <a onClick={this.open} class={{ right: true }}>编辑</a>
                  <p><i class="iconfont icon-dianhua1"></i>{params.row.linkman}/{params.row.phone}</p>

                </li>
              </ul>
            )
          }
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
          render: (h, params) => {
            return (
              <div>
                <i-button type="info" onClick={this.open} style={{ marginRight: '5px' }} size="small">解除关系</i-button>
                <i-button type="info" onClick={this.open} style={{ marginRight: '5px' }} size="small">天剑产品</i-button>
                <i-button type="info" onClick={this.open} style={{ marginRight: '5px' }} size="small">价格设置</i-button>
              </div>
            )
          }
        }],
      tableDate: [],
      ruleValidate: {
        name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]}
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
          // .map((item, index) => {
          //   let s = ``
          //   return {
          //     customerName: s
          //   }
          // })
        })
    },
    open () {
      // this.modal1 = true
      this.$Modal.confirm({
        title: '确认对话框标题',
        // render: (h) => {
        //   return (<i-form ref="formValidate" bindRules={this.ruleValidate} bindLabelWidth="100">
        //     <i-form-item label="姓名" prop="name">
        //       <i-input placeholder="请输入姓名"></i-input>
        //     </i-form-item>
        //     <i-form-item label="邮箱" prop="mail">
        //       <i-input placeholder="请输入邮箱"></i-input>
        //     </i-form-item>
        //   </i-form>)
        // },
        width: 900,
        onOk: () => {
          this.$Message.info('点击了确定')
        },
        onCancel: () => {
          this.$Message.info('点击了取消')
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    reset () {
      this.pageIndex = 1
      this.from.keywords = ''
      this.from.result.value = -1
      this.getList({ pageIndex: '1' })
    },
    ok () {
      this.handleSubmit('formValidate')
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

<style lang="scss">
.img_logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0px 0px 2px #ccc;
  display: block
}

.customerName_content {

  li {
    &:nth-of-type(1) {
      float: left;
      margin-right: 5px;
    }
    &:nth-of-type(2) {
      position: relative;
      top: 5px;
      p {
        width: 75%;
      }
    }
  }
}

.ivu-form-inline {
  .ivu-form-item {
    margin-right: 0px !important;
  }
}
</style>
