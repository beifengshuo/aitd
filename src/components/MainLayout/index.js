import React ,{useEffect,useState}from 'react';
import '@/mock' // simulation data 路径index.js可省略
import { Layout ,Menu } from "antd";
import {  Link } from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import { getMenus } from "@/api/menu";
const { SubMenu } = Menu;
const {Header,Sider,Content }=Layout;
const Main =(props)=>{
    
    const [route , setRoute]=useState(props.route.routes);//props.route.routes
    const [menu , setMenu]=useState([]);//props.route.routes
    useEffect(()=>{
        getMenuList();
      },[])
    const getMenuList = ()=>{
        getMenus({}).then(res => {
            setMenu(res)
        })
    }

       //遍历菜单
    const renderMenu=(data)=>{
        return data.map((item) => {
            if(!!item.childs){
                return (
                    <SubMenu
                        key={item.id}
                        title={<span>
                            <span>{item.name}</span>
                        </span>}
                    >
                        {renderMenu(item.childs)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.id}>
                        <Link to={item.path}>
                            {item.name}
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }
    // console.log("route111",route)
    return(
        <Layout style={{height:'100%'}}>
            <Header style={{color:"#fff"}}>
                header 
                <Link to={`/login`}>点击退出</Link>
            </Header>
            <Layout>
                <Sider style={{color:"#fff"}}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['2']}
                        theme={"dark"}
                        mode="inline"
                        // inlineCollapsed={this.state.collapsed}
                    >
                        {renderMenu(menu)}
                    </Menu>
                </Sider>
                <Content >
                    {renderRoutes(route)}
                </Content>
            </Layout>
        </Layout>
    )
}
export default Main;
