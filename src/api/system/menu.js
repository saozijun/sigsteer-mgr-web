import request from "@/utils/request";

// 列表
export function page(params) {
  return request({
    url: "/v1/menu/page",
    method: "get",
    params,
  });
}

// 删除
export function del(params) {
  return request({
    url: "/v1/menu/delete",
    method: "post",
    params,
  });
}

// 新增
export function add(data) {
  return request({
    url: "/v1/menu/add",
    method: "post",
    data,
  });
}

// 更新
export function update(data) {
  return request({
    url: "/v1/menu/update",
    method: "post",
    data,
  });
}

export function getMenu(id) {
  return request({
    url: `/v1/menu/${id}`,
    method: 'get'
  })
}

export function treeList() {
  return request({
    url: '/v1/menu/treeList',
    method: 'get'
  })
}


export function lazy(pid) {
  return request({
    url: '/v1/menu/lazy/' + pid,
    method: 'get'
  })
}

// 保存角色菜单
export function saveMenu(roleId,allMenuIds) {
  return request({
    url: `/v1/role/${roleId}/saveMenu`,
    method: 'post',
    data: allMenuIds
  })
}