<template>
  <div id="eventNum">

  </div>
</template>

<script>
import * as echarts from "echarts";
import {commonEvent, urgentEvent} from "@/network/event";

export default {
  name: "eventNum",
  data(){
    return{
      common:'',
      urgent:''
    }
  },
  mounted() {
    let eventNum = echarts.init(document.getElementById('eventNum'))
    let p1 = commonEvent().then(res => {
      this.common = res.data.length
    })
    let p2 = urgentEvent().then(res => {
      this.urgent = res.data.length
    })
    Promise.all([p1, p2]).then(res => {
      let option = {
        title: {
          text: '帖子数量'
        },
        tooltip: {},
        xAxis: {
          data: ['普通帖子', '紧急帖子']
        },
        yAxis: {},
        series: [
          {
            name: '年龄',
            type: 'bar',
            data: [this.common,this.urgent]
          }
        ]
      }
      eventNum.setOption(option)
      window.onresize = () => {
        eventNum.resize()
      }
    })

  }
}
</script>

<style scoped>
#eventNum{
  height: 100%;
  width: 50%;
}
</style>
