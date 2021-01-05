import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const Content = () =>{
    return(
        <>Content</>
    )
}

const GetTvalue = () =>{
    return(
        <>GetTvalue</>
    )
}

class RouterPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value :'新闻页面',
            arr: [
                {
                    aid: 1,
                    title: 111
                },
                {
                    aid: 2,
                    title: 222
                },
                {
                    aid: 3,
                    title: 333
                },
                {
                    aid: 4,
                    title: 444
                }
            ]
        }
    }
    render() {
        return(
            <Router>
                <div>
                    <h3>动态路由</h3>
                    {
                        this.state.arr.map((value,key)=>{
                            return (
                                <li key={key}>
                                    <Link to={`/content/${value.aid}`}>{value.title}</Link> //对应着动态路由传参
                                </li>
                            )
                        })
                    }
                    <Route path="/content/:aid" component={Content}></Route>  //动态路由传值path要照着这个格式写，将参数名/:name以这种格式填写 （跳转的路由界面内容显示处）
                    <hr/>
                    <br/>
                    <h3>get方式传值</h3>
                    {
                        this.state.arr.map((value,key)=>{
                            return (
                                <li key={key}>
                                    <Link to={`/gettvalue?aid=${value.aid}`}>{value.title}</Link> // 类似a标签带参数跳转即可
                                </li>
                            )
                        })
                    }
                    <Route path="/gettvalue" component={GetTvalue}></Route>
                </div>
            </Router>
        )
    }
}
export default RouterPage