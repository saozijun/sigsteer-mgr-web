import request from "@/utils/request";

// 查询详情
export function getById(id) {
  return request({
    url: "/lte_signaling/getById/" + id,
    method: "get"
  });
}

// 列表查询
export function list(data) {
  return request({
    url: "/lte_signaling/list",
    method: "post",
    data,
  });
}