import request from '@/utils/request'

export function getUserActionList(data) {
  return request({
    url: 'http://127.0.0.1:8080/useraction/list',
    method: 'get',
    data
  })
}