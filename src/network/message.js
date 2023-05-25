import service from "@/utils/request2";

let addMessage = function(params){
  return service({
    url:"/message",
    method:"post",
    params:params
  })
}

export {
  addMessage
}
