import service from "@/utils/request2";
const getEventList = function (){
  return service({
    url:"event",
    method:"get"
  })
}
const deleteEvent = function (id){
  return service({
    url:"event/"+id,
    method:"delete"
  })
}
const addEvent = function (event){
  return service({
    url:"event",
    method:"post",
    params: event
  })
}
const commonEvent = function(){
  return service({
    url:"event/common",
    method:"get",
  })
}
const urgentEvent = function(){
  return service({
    url:"event/urgent",
    method:"get"
  })
}
const eventSearch = function (target){ //根据标题内容用户名
  return service({
    url:"event/search/" + target,
    method:"get"
  })
}
const getEventByProcess = function(process){
  return service({
    url:"event/process/" + process,
    method:"get"
  })
}
export {
  getEventByProcess,
  getEventList,
  deleteEvent,
  addEvent,
  eventSearch,
  commonEvent,
  urgentEvent
}
