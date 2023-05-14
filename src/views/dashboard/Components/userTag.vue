<template>
<div id="userTag"></div>
</template>

<script>
import * as echarts from "echarts";
import {getUserByTag} from "@/network/user";
import {getEventByProcess} from "@/network/event";

export default {
  name: "userTag",
  data(){
    return{
      disabled:'',
      old:'',
      child:'',
      other:''
    }
  },
  mounted(){
    let userTag = echarts.init(document.getElementById('userTag'))
    let p0 = getUserByTag(0).then(res => {
      this.disabled = res.data.length
    })
    let p1 = getUserByTag(1).then(res => {
      this.old = res.data.length
    })
    let p2 = getUserByTag(2).then(res => {
      this.child = res.data.length
    })
    let p3 = getUserByTag(3).then(res => {
      this.other = res.data.length
    })
    Promise.all([p0, p1, p2, p3]).then(res=>{
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.disabled, name: '残障人士' },
              { value: this.old, name: '老人' },
              { value: this.child, name: '小孩' },
              { value: this.other, name: '其他' },
            ]
          }
        ]
      };
      userTag.setOption(option)
      window.onresize = () => {
        userTag.resize()
      }
    })
  }
}
</script>

<style scoped>
#userTag{
  height: 100%;
  width: 50%;
}
</style>
