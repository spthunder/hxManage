<template>
  <div id="userNum">

  </div>
</template>

<script>
import * as echarts from "echarts";
import {getHuser, getNuser} from "@/network/user";

export default {
  name: "userNum",
  data(){
    return{
      pp: 100,
      qq: 200,
      nUser: '',
      hUser: ''
    }
  },
  created() {
  },
  mounted() {
    console.log("开始啦")
    let userNum = echarts.init(document.getElementById('userNum'))
    let nUser, hUser
    let p1 = getNuser().then(res => {
      this.nUser = res.data.length
    })
    let p2 = getHuser().then(res => {
      this.hUser = res.data.length
    })
    Promise.all([p1, p2]).then(res => {
      let option = {
        title: {
          text: '用户比例',
          subtext: '基于用户角色',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.nUser, name: '受助人群' },
              { value: this.hUser, name: '爱心人士' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      userNum.setOption(option)
      window.onresize = () => {
        userNum.resize()
      }
    })

  },
}
</script>

<style scoped>
#userNum{
  height: 100%;
  width: 50%;
}
</style>
