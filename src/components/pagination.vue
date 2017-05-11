<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 30, 50, 100]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="200">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name:'pagination',
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage4: 4
      };
    }
  }
</script>