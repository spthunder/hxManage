<template>
  <div class="app-container">
      <div style="margin-top: 15px;margin-bottom: 15px">
        <el-input placeholder="请输入标题或内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="id" value="1"></el-option>
            <el-option label="名称" value="2"></el-option>
          </el-select>
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    <div style="margin-bottom: 1rem">
      <el-button type="primary" size="small" @click="changeShowAdd">添加</el-button>
    </div>
    <el-form v-show="showAdd" style="width: 60%"  ref="form" :model="form" label-width="80px">
      <el-form-item label="通知标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="通知">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onsubmit">立即创建</el-button>
        <el-button @click="changeShowAdd">取消</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      v-show="!showAdd"
      border
      style="width: 100%"
      height="40rem">
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
        prop="id"
        label="ID"
        fixed
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="400">
      </el-table-column>
      <el-table-column
        prop="time"
        label="创建时间"
        width="200">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleAgree(scope.$index, scope.row)">一键审核</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {deleteNotify, addNotify, getNotifyList, notifySearch} from "@/network/notify";
import {addEvent, eventSearch, getEventList} from "@/network/event";

export default {
  data() {
    return {
      list:[],
      showAdd:false,
      form: {
        title:'',
        content:''
      },
      input3:'',
      select:''
    }
  },
  created() {
    getNotifyList().then(res => {
      this.list.push(...res.data)
      console.log(this.list)
    })

  },
  methods: {
    search(){
      if(this.input3 === ''){
        this.reload()
      }else{
        notifySearch(this.input3).then(res => {
          this.list = []
          this.list.push(...res.data)
          console.log(this.list)
        })
      }
    },
    reload() {
      getNotifyList().then(res => {
        this.list = []
        this.list.push(...res.data)
      })
    },
    handleClick(row) {
      console.log(row);
    },
    changeShowAdd() {
      this.showAdd = !this.showAdd
    },
    handleDelete(index, row) {
      deleteNotify(row.id).then(res => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });
        this.reload()
      })
    },
    onsubmit() {
      this.form.time = new Date().toLocaleDateString()
      addNotify(this.form).then(res => {
        console.log(this.form)
        console.log(res)
        this.$notify({
          title: '成功',
          message: '插入成功',
          type: 'success'
        });
        this.form = {
          title: '',
          content: '',
        }
      })
    },
  }

}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

