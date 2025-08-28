import request from "@/utils/request";

// 列表
export function page(params) {
  return request({
    url: "/v1/user/page",
    method: "get",
    params,
  });
}

// 删除
export function del(params) {
  return request({
    url: "/v1/user/delete",
    method: "post",
    params,
  });
}

// 详情
export function getById(id) {
  return request({
    url: "/v1/user/" + id,
    method: "get",
  });
}

// 新增
export function add(data) {
  return request({
    url: "/v1/user/add",
    method: "post",
    data,
  });
}

// 更新
export function update(data) {
  return request({
    url: "/v1/user/edit",
    method: "post",
    data,
  });
}

// 改变用户状态
export function changeStatus(id, enabled) {
  return request({
    url: `/v1/user/${id}/changeStatus`,
    method: "post",
    params: { status: enabled },
  });
}
