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
    method:"put"
  })
}
const deleteNotify = function(id){
  return service({
    url:"notify/" + id,
    method:"delete"
  })
}
export {
  getNotifyList,
  addNotify,
  deleteNotify
}
