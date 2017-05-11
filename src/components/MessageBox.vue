<template>
  <a type="text" @click="open"><slot></slot></a>
</template>

<script>
  export default {
    name:'messaeg',
    props:['title','type','message','showCancelButton','cancelButtonText'],
    mounted(){

    },
    methods: {
      open() {
        this.$msgbox({
          title: this.title,
          type:this.type,
          message: this.message,
          showCancelButton: this.showCancelButton,
          confirmButtonText: this.cancelButtonText,
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.confirm(instance,done)
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
      confirm(instance,done){
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = '执行中...';
          done();
          instance.confirmButtonLoading = false;
      }
    }
  }
</script>