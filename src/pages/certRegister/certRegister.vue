<template src="./certRegister.html"></template>
<script type="text/jsx">
    import pagination from '@/components/pagination';
    import dailog from '@/components/Dailog';
    import FileUpload from '@/components/FileUpload';
    const URL = {
        LIST: 'scm.cert.pageProductCert',
        DETAIL: 'scm.productAuthorize.getRegistDetail'
    };
    let formMsg = () => {
        return {
            input: '',
            select: '',
            radio: 'male',
            checkbox: [],
            switch: true,
            date: '',
            time: '',
            slider: [20, 50],
            textarea: ''
        }
    };
    export default {
        name: 'CertRegister',
        data () {
            return {
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
                        title: '注册证号/产品名称',
                        key: 'registNo',
                        render: (h, params) => {
                            return (
                                    <div>
                                        <p class="success">{params.row.registNo }</p>
                                        <p>{params.row.registName}</p>
                                    </div>)
                        }
                    },
                    {
                        title: '生产厂商',
                        key: 'factoryName',
                        align: 'center',
                        width: 220
                    },
                    {
                        title: '有效期',
                        key: 'startTime',
                        align: 'center',

                        render: (h, params) => {
                            let date, n = params.row;
                            if (n.startTime) {
                                date = n.startTime + ' 至 ' + (n.longTerm == '1' ? '长期' : n.endTime) + '' + (n.isPast == 1 ? '<span class="pastDue ">过期</span>' : '');
                            } else {
                                date = n.longTerm == '1' ? '长期' : n.endTime ? '至' + n.endTime : ''
                            }
                            return (
                                    <div>
                                        <p> { date } </p>
                                    </div>)
                        }
                    },
                    {
                        title: '审核状态',
                        key: 'commitNum',
                        align: 'center',
                        width: 120,
                        render: (h, params) => {
                            let _registStatus,
                                className = '',
                                n = params.row;
                            switch (n.registStatus) {
                                case '1' :
                                    _registStatus = '创建';
                                    break;
                                case '2' :
                                    _registStatus = '待审核';
                                    className = 'warning';
                                    break;
                                case '3' :
                                    _registStatus = '审核通过';
                                    className = 'success';
                                    break;
                                case '4' :
                                    _registStatus = '审核不通过';
                                    className = 'error';
                                    break;
                                default :
                                    break;
                            }
                            return (<span class={className}> { _registStatus } </span>)
                        }
                    },
                    {
                        title: '已有产品数',
                        key: 'productNum',
                        align: 'center',
                        width: 110
                    },

                    {
                        title: '操作',
                        key: 'oper',
                        width: 200,
                        render: (h, params) => {
                            let n = params.row;
                            return (
                                    <div>
                                        <i-button type="info" onClick={this.view.bind(this, params.row)} style={{marginRight: '5px'}} size="small">查看</i-button>
                                        <i-button type="info" v-show={n.registStatus == 3 && n.needUpdate == 1} onClick={this.update} style={{marginRight: '5px'}} size="small">更新
                                        </i-button>
                                        <i-button type="info" v-show={n.registStatus == 1 || n.registStatus == 4} onClick={this.edit } style={{marginRight: '5px'}} size="small">
                                            编辑
                                        </i-button>
                                    </div>)
                        }
                    }],
                showDetail: false,
                showAdd: false,
                detail: {},
                formItem: formMsg(),
                list: {
                    total: 0,
                    pageSize: 0
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {},
        methods: {
            getList: function ({pageIndex = this.pageIndex, pageSize = this.pageSize}) {
                let self = this;
                this.Http.post(URL.LIST, {
                    params: {
                        'keywords': this.from.keywords,
                        'pageIndex': pageIndex,
                        'pageSize': pageSize
                    }
                }).then(function (re) {
                    self.list = re.data;

                })
            },
            add(){
                this.showAdd = true;
                this.formItem = formMsg();
            },
            commit(){

            },
            update(){
            },
            edit(){

            },
            view (item) {
                let self = this,
                    id = item.basicProductNo;
                this.Http.post(URL.DETAIL, {
                    params: {
                        basicProductNo: id
                    }
                }).then((result = {}) => {
                    self.detail = result.data;
                    self.showDetail = true;
                });
            },
            cancel(){
                self.showDetail = false;
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
                this.getList({pageIndex: '1'})
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
            FileUpload,
            dailog
        }
    }

</script>

<style lang="scss" src="./certRegister.scss"></style>
