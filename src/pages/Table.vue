<template>
	<section>
		<!--工具条-->
		<Row>
			<Col span="24" class="toolbar" style="padding-bottom: 0px;">
				<Form  inline >
					<Form-item label="处理结果 : " :label-width="70">
						<Select  v-model="from.result.value" placeholder="请选择" class="w100 ">
							<Option
								v-for="item in from.result.options"
								:label="item.label"
								:value="item.value"
								:key="item.value">
							</Option>
						</Select >
					</Form-item>
					<Form-item>
					<Select  v-model="from.type.value" placeholder="请选择" class="w180">
							<Option
								v-for="item in from.type.options"
								:label="item.label"
								:value="item.value"
								:key="item.value">
							</Option>
						</Select >
					</Form-item>
					<Form-item>
						<Date-picker type="daterange" placement="bottom-end" placeholder="开始时间-结束时间" @on-change="dateChangeTime" class="w180" format="yyyy-MM-dd"></Date-picker>
					</Form-item>
					<Form-item>
						<Input  placeholder="消费方" v-model="from.search_subscriber_appcode" class="w100"></Input >
					</Form-item>
						<Form-item>
						<Input  placeholder="接口编码/接口名称/请求参数/返回结果" v-model="from.search_interface_code"></Input >
					</Form-item>
					<Form-item>
						<Button  type="primary" @click="getList" >搜索</Button >
					</Form-item>
					<Form-item>
						<Button   @click="reset">重置</Button >
					</Form-item>
				</Form>
			</Col>
			<Col span="24">
				<Table border :columns="columns" :data="data1"></Table>
			</Col>
			<Col span="24">
				<Page :total="total" :page-size="pageSize" :current="pageIndex" @on-change="changePage" @on-page-size-change="changeSize"show-elevator show-sizer show-total></Page>
			</Col>
		</Row>
	</section>
</template>

<script>
	import ajax from '@/config/axios'
	export default {
		name:'table',
		data() {
			return {
				users: [],
				total: 0,
				pageSize: 20,
				pageIndex:1,
				listLoading: false,
				addLoading: false,
				from:{
					result:{
						options: [{
							value: '1',
							label: '成功'
							}, {
							value: '2',
							label: '失败'
							}],
						value: '1'
					},
					type:{
						options: [{
							value: '-1',
							label: '事件类型'
						},{
							value: '供应链增量数据拉取-保存',
							label: '供应链增量数据拉取-保存'
						},{
							value: 'ERP增量数据拉取-保存',
							label: 'ERP增量数据拉取-保存'
						},{
							value: '全量数据拉取-保存',
							label: '全量数据拉取-保存'
						},{
							value: '批量数据拉取',
							label: '批量数据拉取'
						},{
							value: '批量数据上传',
							label: '批量数据上传'
						},{
							value: '批量数据上传(发布)',
							label: '批量数据上传(发布)'
						},{
							value: '批量数据上传(消费)',
							label: '批量数据上传(消费)'
						},{
							value: '业务状态回写',
							label: '业务状态回写'
						},{
							value: '消息分发(发布)',
							label: '消息分发(发布)'
						},{
							value: '消息分发(消费)',
							label: '消息分发(消费)'
						}],
						value: '-1'
					},
					date:{
						startTime:'',
						endTime:''
					},
					search_interface_code:'',
					search_subscriber_appcode:''
				},
				startTime:'',
				endTime:'',
				columns:[{
                        title: '序号',
                        key: 'num',
						width:80,
						align:'center'
                    },
                    {
                        title: '消费方',
                        key: 'subscriber_appcode'
                    },
                    {
                        title: '企业编号',
                        key: 'company_no'
                    },{
						title: '接口编码',
						key: 'interface_code'
					}, {
						title: '接口名称',
						key: 'interface_name'
					}, {
						title: '调用时间',
						key: 'create_time'
					}, {
						title: '处理结果',
						key: 'result'
					}, {
						title: '耗时(ms)',
						key: 'interval_time'
					}, {
						title: '操作',
						key: 'operate'
					}],
				data1:[]

			}
		},
		methods: {
			getList:function( )   {
				var self=this;
				ajax('serviceoi.auditAPI.queryAuditLog',
				{"auditLog":{"interface_code":this.from.search_interface_code,"result":this.from.result.value,"event_type":this.from.type.value,
				"subscriber_appcode":this.from.search_subscriber_appcode,"begin_time":this.startTime,"end_time":this.endTime,"pageIndex":this.pageIndex,"pageSize":this.pageSize}})
				.then(function(re){
					console.log(re)
						self.data1=[];
						self.users=[];
						re.data.rows.forEach(function(item,index){
							let data={
								num:index+1+(self.pageIndex-1)*self.pageSize,
								subscriber_appcode:item.subscriber_appcode,
								company_no:item.company_no,
								interface_code:item.interface_code,
								create_time:item.create_time,
								result:item.result,
								interval_time:item.interval_time,
								operate:'<a>12312<a>'
							}
							self.users.push(data);
						})
						self.data1=self.users;
						self.total=re.data.total;
						self.pageSize=re.data.pageSize;
				})
			},
			reset:function(){
				this.from.result.value='1'
				this.from.type.value='-1'
				this.from.search_interface_code=''
				this.from.search_subscriber_appcode=''
				this.from.date.startTime=''
				this.from.date.endTime=''
				this.startTime=''
				this.endtTime=''
				this.getList();
			},
			dateChangeTime:function(val){
				this.startTime=val[0];
				this.endTime=val[1];
			},
			changeSize:function(size){
				this.pageIndex=1;
				this.pageSize=size;
				this.getList();
			},
			changePage:function(){

			}

		},
		mounted() {
			this.getList();
		},
		computed(){
		}
	}

</script>

<style scoped lang="scss">
		.w100{width:100px !important;}
		.w120{width:120px !important;}
		.w140{width:140px !important;}
		.w160{width:160px !important;}
		.w180{width:180px !important;}
		.w200{width:200px !important;}
		.w220{width:220px !important;}
		.w240{width:240px !important;}
		.w260{width:260px !important;}
		.w280{width:280px !important;}
		.inline{display:inline-block;}
		.ivu-form-inline {
			.ivu-form-item {
				margin-right:0px !important;
			}
		}
</style>