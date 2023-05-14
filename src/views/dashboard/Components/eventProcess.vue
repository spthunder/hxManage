<template>
  <div id="eventProcess">

  </div>
</template>

<script>
import * as echarts from "echarts";
import {getEventByProcess} from "@/network/event";

export default {
  name: "eventProcess",
  data(){
    return{
      process0:'',  //未建立
      process1:'',  //待审核
      process2:'',  //流程中
      process3:''   //已完成
    }
  },
  mounted() {
    let eventProcess = echarts.init(document.getElementById('eventProcess'))
    let p0 = getEventByProcess(0).then(res => {
      this.process0 = res.data.length
    })
    let p1 = getEventByProcess(1).then(res => {
      this.process1 = res.data.length
    })
    let p2 = getEventByProcess(2).then(res => {
      this.process2 = res.data.length
    })
    let p3 = getEventByProcess(3).then(res => {
      this.process3 = res.data.length
    })
    Promise.all([p0, p1, p2, p3]).then(res => {
      let option = {
        title: {
          text: '帖子帮扶进度'
        },
        tooltip: {},
        xAxis: {
          data: ['未建立', '待审核', '流程中' , '帮扶完成']
        },
        yAxis: {},
        series: [
          {
            name: '状态',
            type: 'bar',
            data: [
              {
                value:this.process0,
                itemStyle:{
                  color:'#a90000'
                }
              },
              this.process1,
              {
                value:this.process2,
                itemStyle:{
                  color:'purple'
                }
              },
              {
                value:this.process3,
                itemStyle:{
                  color:'green'
                }
              },
            ]
          }
        ]
      }
      eventProcess.setOption(option)
      window.onresize = () => {
        eventProcess.resize()
      }
    })

  }
}
</script>

<style scoped>
#eventProcess{
  height: 100%;
  width: 50%;
}
</style>
