import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id()',
    name: '@ctitle(2,4)医院',
    description: '@cparagraph',
    status: '@boolean',
    created_at: '@datetime'
  }]
})

export default [
  // 获取列表
  {
    url: '/admin/hospitalList',
    type: 'get',
    response: config => {
      const items = data.items
      const { name, currentPage = 1, pageSize = 20 } = config.query
        const mockList = items.filter(user => {
          if (name && user.name.indexOf(name) === -1) return false
          return true
        })
        const pageList = mockList.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  // 创建or编辑
  {
    url: '/admin/createHospital',
    type: 'post',
    response: config => {
      let obj  = config.query
      if (obj.id) {
        data.items.some(u => {
          if (u.id === obj.id) {
            u.name = obj.name
            u.description = obj.description
            u.status = obj.status
            return true
          }
        })
        return {
          code: 20000,
          message: '修改成功'
        }
      }else{
        obj.id = Mock.Random.id()
        obj.created_at = Mock.mock('@now')
        data.items.unshift(obj)

        return {
          code: 20000,
          message: '添加成功'
        }
      }

    }
  },
  // 删除
  {
    url: '/admin/delHospital',
    type: 'get',
    response: config => {
      let obj  = config.query
      if (!obj.id) {
        return {
          code: -999,
          message: '参数不正确'
        }
      } else {
        data.items = data.items.filter(u => u.id !== obj.id)
        return {
          code: 20000,
          message: '删除成功'
        }
      }
    }
  },
  // 批量删除
  {
    url: '/admin/batchremove/hospital',
    type: 'post',
    response: config => {
      let str  = config.query.idStr
      let arr = str.split(',')
      data.items = data.items.filter(u => !arr.includes(u.id))
      return {
        code: 20000,
          message: '批量删除成功'
      }
    }
  }
]
