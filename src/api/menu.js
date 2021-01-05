import request from './request';
export function getMenus(params) {
    return request({
      url: '/menu/get',
      method: 'get',
      params: params
    })
}