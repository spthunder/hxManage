import service from "@/utils/request2";
const getUserList = function(){
  return service({
    url:"user",
    method: "get"
  })
}
const getHuser = function(){
  return service({
    url:"user/huser",
    method: "get"
  })
}
const getNuser = function(){
  return service({
    url:"user/nuser",
    method:"get"
  })
}
const deleteUserById = function (id){
  return service({
    url:"user/" + id,
    method:"delete"
  })
}
const userSearch = function (name){
  return service({
    url:"user/" + name,
    method:"get"
  })
}
const addUser = function (user){
  return service({
    url:"user",
    method:"post",
    params: user
  })
}
const getUserByTag = function(tag){
  return service({
    url:"user/tag/" + tag,
    method:"get"
  })
}
export {
  getUserList,
  deleteUserById,
  userSearch,
  addUser,
  getNuser,
  getHuser,
  getUserByTag
}
