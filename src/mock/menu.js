import Mock from 'mockjs'
import * as mUtils from './mUtils'
let List = []
const count = 60
let typelist = [1, 2, 3, 4, 5, 6, 7, 8]
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    income: Mock.Random.float(0, 9999, 2,2),
    pay: Mock.Random.float(-5999, 0, 2,2),
    accoutCash: Mock.Random.float(0, 9999, 2,2),
    'incomePayType|1': typelist
  }))
}
export default {
  /* 获取列表 geMenuList*/
  geMenuList: config => {
    return {
      code: 200,
      data:[
        {
            "id": 1,
            "name": "首页",
            "path": "/home",
            "component": "@/components/Default",
            "exact": true
        },
        {
            "id": 2,
            "name": "工具页",
            "path": "/tool",
            "childs": [
                {
                    "id": 21,
                    "name": "列表页",
                    "path": "/tool/list",
                    "component": "components/Default",
                    "exact": true
                },
                {
                    "id": 22,
                    "name": "表单页",
                    "path": "/tool/form",
                    "component": "components/Default",
                    "exact": true
                }
            ]
        },
      ]
    }
  },
//   /** 增加资金信息createMoney*/
//   createMoney: config => {
//     const { username, address, income, pay , accoutCash, incomePayType } = mUtils.param2Obj(config.url)
//     List.push({
//       id: Mock.Random.guid(),
//       username: username,
//       address: address,
//       createTime: Mock.Random.now(),
//       income: income,
//       pay: pay,
//       accoutCash: accoutCash,
//       incomePayType: incomePayType
//     })
//     return {
//       code: 200,
//       data: {
//         message: '添加成功'
//       }
//     }
//   },
//   /*** 删除用户deleteMoney */
//   deleteMoney: config => {
//     const { id } = mUtils.param2Obj(config.url)
//     if (!id) {
//       return {
//         code: -999,
//         message: '参数不正确'
//       }
//     } else {
//       List = List.filter(u => u.id !== id)
//       return {
//         code: 200,
//         data: {
//           message: '删除成功'
//         }
//       }
//     }
//   },
//   /* 批量删除 */
 
//   batchremoveMoney: config => {
//     console.log(config);
//     // console.log(mUtils.param2Obj(config.url));
//     let { ids } = mUtils.param2Obj(config.url)
//     console.log(ids);
//     ids = ids.split(',')
//     List = List.filter(u => !ids.includes(u.id))
//     return {
//       code: 200,
//       data: {
//         message: '批量删除成功'
//       }
//     }
//   },
//   /*修改用户 */
//   updateMoney: config => {
//     const { id,username, address, income, pay , accoutCash, incomePayType } = mUtils.param2Obj(config.url)
//     List.some(u => {
//       if (u.id === id) {
//         u.username = username
//         u.address = address
//         u.income = income
//         u.pay = pay
//         u.accoutCash = accoutCash
//         u.incomePayType = incomePayType
//         return true
//       }
//     })
//     return {
//       code: 200,
//       data: {
//         message: '编辑成功'
//       }
//     }
//   }
}