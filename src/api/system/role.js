import request from "@/utils/request";

// 全部列表
export function list(params) {
  return request({
    url: "/v1/role/list",
    method: "get",
    params,
  });
}

// 列表
export function page(params) {
  return request({
    url: "/v1/role/page",
    method: "get",
    params,
  });
}

// 删除
export function del(params) {
  return request({
    url: "/v1/role/delete",
    method: "post",
    params,
  });
}

// 详情
export function getById(id) {
  return request({
    url: "/v1/role/" + id,
    method: "get",
  });
}

// 保存菜单
export function saveMenu(roleId, menuIds) {
  return request({
    url: "/v1/role/save_menu",
    method: "post",
    data: { roleId, menuIds },
  });
}

// 获取角色菜单
export function getRole(id) {
  return request({
    url: "/v1/role/get_role/" + id,
    method: "get",
  });
}

// 新增
export function add(data) {
  return request({
    url: "/v1/role/add",
    method: "post",
    data,
  });
}

// 更新
export function update(data) {
  return request({
    url: "/v1/role/edit",
    method: "post",
    data,
  });
}
