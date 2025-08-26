import request from '@/utils/request'


// CBTC告警统计
export const getAlarmStat = () => {
  return request({
    url: '/main/get_alarm_stat',
    method: 'get'
  })
}

// 列车概况
export const getTrainView = () => {
  return request({
    url: '/main/get_train_view',
    method: 'get'
  })
}

// 日告警走势折线图
export const getTrainDayAlarm = () => {
  return request({
    url: '/main/get_train_day_alarm',
    method: 'get'
  })
}

// 平均时间间隔折线图
export const getIntervalTime = (params) => {
  return request({
    url: '/main/get_interval_time',
    method: 'get',
    params
  })
}

// 最新列车告警列表
export const getTrainLatestAlarm = (data) => {
  return request({
    url: '/main/get_train_latest_alarm',
    method: 'post',
    data
  })
}

// CBTC告警统计
export const getCbtcDayAlarmRate = (data) => {
  return request({
    url: '/main/get_cbtc_day_alarm_rate',
    method: 'post',
    data
  })
}