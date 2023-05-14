import axiosUp from "@/utils/axios2";

let getImgUrl = function (file){
  let formData = new FormData()
  formData.append('photo', file)
  return axiosUp({
    url:"/file/uploadFile",
    method:"post",
    data: formData
  })
}

export {
  getImgUrl
}
