import axios from 'axios';

//通用的请求---实例
let instance = axios.create({});
instance.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
})

// http response 拦截器
instance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        const {data} = response;
        if(data.code === 200){
            return data.data
        }
        return response;
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error) // 返回接口返回的错误信息
    })
export default instance;