import service from "@/utils/request2";
const getNotifyList = function (){
  return service({
    url:"notify",
    method:"get"
  })
}
const addNotify = function (notify){
  return service({
    url:"notify",
    method:"post",
    params: notify
  })
}
const deleteNotify = function(id){
  return service({
    url:"notify/" + id,
    method:"delete"
  })
}
const notifySearch = function (target){ //根据标题内容
  return service({
    url:"notify/search/" + target,
    method:"get"
  })
}
export {
  getNotifyList,
  addNotify,
  deleteNotify,
  notifySearch
}
