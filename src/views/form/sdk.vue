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
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择事件类型">
          <el-option label="普通事件" value="0"></el-option>
          <el-option label="紧急事件" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="配图">
       <upload @getUrl="getUrl"></upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="changeShowAdd">取消</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      v-show="!showAdd"
      border
      style="width: 100%"
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
        prop="title"
        label="标题"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="img"
        type="img"
        label="配图"
        fixed
        width="120">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        fixed
        type="img"
        width="120">
      </el-table-column>
      <el-table-column
        prop="collect"
        label="收藏数"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="love"
        label="喜欢数"
        fixed
        width="120">
      </el-table-column>
      <el-table-column
        prop="process"
        label="进度"
        width="120">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="250">
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
import {addUser, getUserList} from "@/network/user";
import {getEventList,deleteEvent,addEvent} from "@/network/event";
import upload from "@/views/form/components/upload";
export default {
  components:{
    upload
  },
  data() {
    return {
      list:[],
      showAdd:false,
      form: {
        title: '',
        content:'',
        type: '',
        tel:'',
        img:'',
        love:0,
        collect:0,
        userId:9,
        name:'admin',
        time:''
      }
    }
  },
  methods: {
    reload(){
      getEventList().then(res => {
        this.list = []
        this.list.push(...res.data)
      })
    },
    getUrl(url){
      this.form.img = url
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      deleteEvent(row.id).then(res => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });
        this.reload()
      })
    },
    changeShowAdd() {
      this.showAdd = !this.showAdd
    },
    onSubmit(){
      this.form.time = new Date().toLocaleDateString()
      addEvent(this.form).then(res=>{
        console.log(this.form)
        console.log(res)
        this.$notify({
          title: '成功',
          message: '插入成功',
          type: 'success'
        });
        this.form = {
          title: '',
          content:'',
          type: '',
          tel:'',
          img:'',
          love:0,
          collect:0,
          userId:9,
          name:'admin'
        }
        this.changeShowAdd()
        this.reload()
      })
    },
  },
  created() {
    getEventList().then(res => {
      this.list.push(...res.data)
      console.log(this.list)
    })
  },

}
</script>

<style scoped>
.line{
  text-align: center;
}

</style>

