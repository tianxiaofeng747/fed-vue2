<template>
    <div>
        <div class="demo-upload-list demo-upload-block" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <a :href="item.fullUrl" v-boxer="item.fullUrl">
                    <img :src="item.fullUrl">
                </a>
                <div class="demo-upload-list-cover">
                    <Icon type="ios-close-empty"  @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <div class="demo-upload-block">
            <Upload ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    :action="config.IMAGE_UPLOAD" >
                <div >
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
        </div>
    </div>
</template>
<script type="text/javascript">
    import CONFIG from '../../config/app.config';
    import '../../directive/vueDirective.js';
    export default {
        data (){
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'fullUrl': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'fullUrl': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                config : CONFIG
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.fullUrl =  this.config.IMAGE_DOWNLOAD + JSON.parse(res).data;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            }
        },
        mounted(){
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>

<style lang="scss" scoped>
    .demo-upload-block{
        display: inline-block;
        width: 90px;
        height: 90px;
        line-height: 90px;
    }
    .demo-upload-list{
        text-align: center;
        line-height: 90px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        padding: 2px;
        border-radius: 50%;
        background-color: rgba(255,0,0,.8);
        opacity: .4;
        line-height: 12px;
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        opacity:1;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        line-height: 11px;
    }
</style>