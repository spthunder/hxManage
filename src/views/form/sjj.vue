<template>
  <div class="app-container">
      <div style="margin-top: 15px;margin-bottom: 15px">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="id" value="1"></el-option>
            <el-option label="名称" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    <div style="margin-bottom: 1rem">
      <el-button type="primary" size="small" @click="changeShowAdd">添加</el-button>
    </div>
    <el-form v-show="showAdd" style="width: 60%"  ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="角色选择">
        <el-select v-model="form.role" placeholder="请选择用户角色">
          <el-option label="求助用户" value="0"></el-option>
          <el-option label="帮扶用户" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
        <el-input v-model="form.img"></el-input>
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
import {getNotifyList} from "@/network/notify";

export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    changeShowAdd(){
      this.showAdd = !this.showAdd
    }
  },

  data() {
    return {
      list:[],
      showAdd:false,
      form: {
        name: '',
        password:'',
        role: '',
        age:'',
        img:'',
        collectList:'0',
        inProcess:'0',
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

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

