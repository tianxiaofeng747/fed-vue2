<template>
    <Modal
        v-model="$modal"
        :width="$width"
        :title="$title"
        :closable="false" 
        :mask-closable="false"
        :loading="true"
        @on-ok="ok"
        :styles="{top: '100px'}"
        @on-cancel="cancel">
        <slot name='content1'></slot>
    </Modal>
</template>
<script>
    export default {
      name: 'Dailog',
      data () {
        return {
        }
      },
      props: ['$modal', '$width', '$title'],
      methods: {
        ok () {
          this.$emit('update:$modal', false)
          this.$emit('ok')
        },
        cancel () {
          this.$emit('update:$modal', false)
        }
      }
    }
</script>
