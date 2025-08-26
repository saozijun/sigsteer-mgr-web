import request from "@/utils/request";

// 列表
export function page(params) {
  return request({
    url: "/stationInfo/page",
    method: "get",
    params,
  });
}

// 删除
export function del(params) {
  return request({
    url: "/stationInfo/delete",
    method: "post",
    params,
  });
}

// 详情
export function getById(id) {
  return request({
    url: "/stationInfo/getById/" + id,
    method: "get",
  });
}

// 新增
export function add(data) {
  return request({
    url: "/stationInfo/add",
    method: "post",
    data,
  });
}

// 更新
export function update(data) {
  return request({
    url: "/stationInfo/update",
    method: "post",
    data,
  });
}
