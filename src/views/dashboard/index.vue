<template>
  <div class="dashboard-container">
<!--    n 和 h 的占比-->
    <div class="top-half">
      <event-num></event-num>
<!--      n 和 h 的数量-->
      <user-num></user-num>
    </div>
    <div class="bottom-half">
<!--      用户的年龄分布比例-->
      <user-tag></user-tag>
<!--      事件 紧急 和 普通的占比-->
      <event-process></event-process>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';
import UserNum from "@/views/dashboard/Components/userNum";
import EventNum from "@/views/dashboard/Components/eventNum";
import EventProcess from "@/views/dashboard/Components/eventProcess";
import UserTag from "@/views/dashboard/Components/userTag";

export default {
  name: 'Dashboard',
  components: {UserTag, EventProcess, EventNum, UserNum},
  // 基于准备好的dom，初始化echarts实例
  mounted() {

  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  height: 100%;
  width: 100%;
  padding: 1rem;
  .top-half{
    display: flex;
    height: 23rem;
    width: 100%;
    //background-color: deepskyblue;


  }
  .bottom-half{
    display: flex;
    height: 23rem;
    width: 100%;
    //background-color: greenyellow;
    #userAge{
      height: 100%;
      width: 50%;
    }
    #eventPercentage{
      height: 100%;
      width: 50%;
    }
  }
}
</style>
