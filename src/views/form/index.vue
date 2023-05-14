<template>
  <div class="app-container">
    <div style="margin-top: 15px;margin-bottom: 15px">
      <el-input placeholder="根据用户名查询" v-model="input3" class="input-with-select">
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
      <el-form-item label="用户标签">
        <el-select v-model="form.tag" placeholder="请选择用户标签">
          <el-option label="残障人士" value="0"></el-option>
          <el-option label="老人" value="1"></el-option>
          <el-option label="小孩" value="2"></el-option>
          <el-option label="其他" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
        <upload @getUrl="getUrl"></upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">立即创建</el-button>
        <el-button @click="changeShowAdd">取消</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-show="!showAdd"
      :data="list"
      border
      style="width: 100%;"
      height="35rem">
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
        prop="name"
        label="用户名"
        fixed
        width="150">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="img"
        label="头像"
        fixed
        type="img"
        width="120">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="collectList"
        label="收藏列表"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="250">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleAgree(scope.$index, scope.row)">已经完成</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getUserList, addUser, deleteUserById, userSearch} from "@/network/user";
import upload from "@/views/form/components/upload";
export default {
  components:{
    upload
  },
  data(){
    //age role需要为int
    return{
      showAdd:false,
      list:[],
      input3:"",
      form: {
        tag:'',
        name: '',
        password:'',
        role: '',
        age:'',
        img:'',
        collectList:'0',
        inProcess:'0',
      }
    }
  },
  methods: {
    getUrl(url){
      this.form.img = url
    },
    changeShowAdd(){
      this.showAdd = !this.showAdd
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      deleteUserById(row.id).then(res => {
        console.log(res)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });
        this.reload()
      })
    },
    reload(){
      getUserList().then(res => {
        this.list = []
        res.data.forEach((item,index) => {
          if(item.tag === 0){
            res.data[index].tag = "残障人士"
          }else if(item.tag === 1){
            res.data[index].tag = "老人"
          }else if(item.tag === 2){
            res.data[index].tag = "小孩"
          }else if(item.tag === 3){
            res.data[index].tag = "其他"
          }
        })
        this.list.push(...res.data)
        console.log(this.list)
      })
    },
    onsubmit(){
      addUser(this.form).then(res=>{
        console.log(this.form)
        console.log(res)
        this.$notify({
          title: '成功',
          message: '插入成功',
          type: 'success'
        });
        this.form = {
          name: '',
          password:'',
          role: '',
          age:'',
          img:'',
          collectList:'0',
          inProcess:'0',
        }
        this.changeShowAdd()
        this.reload()
      })
    },
    search(){
      userSearch(this.input3).then(res => {
        this.list = []
        this.list.push(...res.data)
        console.log(this.list)
      })
    }
  },

  created() {
    getUserList().then(res => {
      res.data.forEach((item,index) => {
        if(item.tag === 0){
          res.data[index].tag = "残障人士"
        }else if(item.tag === 1){
          res.data[index].tag = "老人"
        }else if(item.tag === 2){
          res.data[index].tag = "小孩"
        }else if(item.tag === 3){
          res.data[index].tag = "其他"
        }
      })
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

