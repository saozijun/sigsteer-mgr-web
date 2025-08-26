import request from "@/utils/request";

// 列表
export function page(params) {
  return request({
    url: "/vehicle_ip_map/page",
    method: "get",
    params,
  });
}

// 删除
export function del(params) {
  return request({
    url: "/vehicle_ip_map/delete",
    method: "post",
    params,
  });
}

// 详情
export function getById(id) {
  return request({
    url: "/vehicle_ip_map/get_by_id/" + id,
    method: "get",
  });
}

// 新增
export function add(data) {
  return request({
    url: "/vehicle_ip_map/add",
    method: "post",
    data,
  });
}

// 更新
export function update(data) {
  return request({
    url: "/vehicle_ip_map/update",
    method: "post",
    data,
  });
}
