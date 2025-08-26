import request from "@/utils/request";

// 列表
export function page(params) {
  return request({
    url: "/fileLog/page",
    method: "get",
    params,
  });
}