import service from "@/utils/request2";
 let login = function(params){
   return service({
     url:"/admin/login",
     method:"post",
     params:params
   })
 }

 export {
   login
 }
