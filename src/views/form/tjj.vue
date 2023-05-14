<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        label="索引"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="工号"
        fixed
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="身份证号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="电子邮箱"
        width="300">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="居家开始时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="居家结束时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="居家申请时间"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

