import request from "@/utils/request";

// 最新折线图
export function latestLineChart(params) {
  return request({
    url: "/interval_analysis/latest_line_chart",
    method: "get",
    params,
  });
}

// 最新时间间隔列表
export function latestIntervalTimeList(params) {
  return request({
    url: "/interval_analysis/latest_interval_time_list",
    method: "get",
    params,
  });
}