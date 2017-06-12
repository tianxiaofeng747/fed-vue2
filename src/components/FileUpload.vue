<template>
    <div>
        <div class="demo-upload-list demo-upload-block" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <a :href="item.fullUrl" v-boxer="item.fullUrl">
                    <img :src="item.thumbnail">
                </a>
                <div class="demo-upload-list-cover" v-show="!readOnly">
                    <Icon type="ios-close-empty" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <div class="demo-upload-block" v-show="!readOnly">
            <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png','pdf']" :max-size="5120"
                    :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :headers="headers"  :before-upload="handleBeforeUpload" multiple type="drag"
                    :action="config.IMAGE_UPLOAD">
                <div>
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
        </div>
    </div>
</template>
<script type="text/javascript">
    import CONFIG from '../config/app.config';
    import '../directive/vueDirective.js';
    import Utils from '@/services/Utils';
    var pdf = require('@/assets/images/pdf.png')
    var noimage = require('@/assets/images/noimage.png');
    import {state} from '@/store/index';
    export default {
        name: 'FileUpload',
        data (){
            return {
                headers: {
                    jtoken: state.userInfo ? state.userInfo.token : ''
                },
                defaultList: [],
                imgName: '',
                maxLength: 5,
                visible: false,
                uploadList: [
                    {
                        'name': '',
                        'thumbnail': '',
                        'fullUrl': ''
                    }
                ],
                config: CONFIG
            }
        },
        //传入文件列表->双向绑定  ， 上传失败回调 ，上传成功回调 ， 输出格式 string array
        props: {
            removeCallback: Function,
            successCallback: Function,
            exportType: String,
            max: {
                type: [Number, String]
            },
            readOnly: {
                type: [Boolean,String]
            },
            fileList: {
                type: [Array,String],
                default: ()=>{
                    return [];
                }
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
                this.removeCallback && this.removeCallback(file);
                this.synchronization();
            },
            //同步
            synchronization: function () {
                let list = this.uploadList.map(function (item) {
                    return item.url;
                });
                this.exportType && this.exportType.toLowerCase() == 'string' && (list += '');
                this.$emit('update:fileList', list);
            },
            //格式化文件
            formatFile (item, name) {
                var self = this,
                        thumbnail;
                switch (Utils.getFileType(item)) {
                    case 'image':
                        thumbnail = self.config.IMAGE_DOWNLOAD + item;
                        break;
                    case 'pdf':
                        thumbnail = pdf;
                        break;
                    default :
                        thumbnail = noimage;
                        break;
                }
                return {
                    name: name || '',
                    url: item,
                    status: 'finished',
                    thumbnail: thumbnail,
                    fullUrl: self.config.IMAGE_DOWNLOAD + item
                }
            },
            handleSuccess (res, file) {
                const url = JSON.parse(res).data,
                        obj = this.formatFile(url, file.name);
                file.thumbnail = obj.thumbnail;
                file.fullUrl = obj.fullUrl;
                file.url = obj.url;
                this.successCallback && this.successCallback(file);
                this.synchronization();
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
                    desc: '文件 ' + file.name + ' 太大，不能超过 5M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < this.maxLength;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 ' + this.maxLength + ' 张图片。'
                    });
                }
                return check;
            }
        },
        created(){
            this.maxLength = Math.round(this.max);
            if (this.fileList && this.fileList.length) {
                this.fileList = typeof this.fileList == 'string' ? this.fileList.split(',') : this.fileList;
                this.defaultList = this.fileList.map((item) => {
                    return this.formatFile(item);
                });
            }
        },
        mounted(){
            let url = this.$refs.upload.fileList;
            url = typeof url == 'string' ? url.split(';') : url instanceof Array ? url : null;
            this.uploadList = url;


        }
    }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .demo-upload-block {
        display: inline-block;
        width: 90px;
        height: 90px;
        line-height: 90px;
    }

    .demo-upload-list {
        text-align: center;
        line-height: 90px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 14px;
        height: 14px;
        padding: 2px;
        border-radius: 50%;
        background-color: rgba(255, 0, 0, .8);
        opacity: .4;
        line-height: 12px;
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        opacity: 1;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        line-height: 11px;
    }
</style>