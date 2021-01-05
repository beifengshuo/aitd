import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {asyncComponent as async} from '@/utils/asyncComponent.js';
import Main from '@/router/main';
import Home from '@/components/Home';


const menudata =[
    {
        "id": 1,
        "name": "首页",
        "path": "/home",
        "component": "components/Home",
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


const RouterAuth = (props)=>{
    let { location, config } = props;
    let { pathname } = location;
    let targetRouterConfig = config.find((item) => item.path === pathname);
    // console.log("config",config);
    // console.log("pathname",pathname);
    // console.log("targetRouterConfig",targetRouterConfig);
    console.log("Home",Home)
    const handleRouters = (menu)=>{
        let childRouter = [];
        menu.forEach((item) => {
            console.log("item",!!item.childs)
            if(!!item.childs){
                childRouter = [...childRouter, ...handleRouters(item.childs)];
            }else{
                let component = item.component;
                // console.log("item.component",item.component)
                let path = item.path;
                //根据es6module语法，由于import是静态执行，所以不能使用表达式和变量，
                //解决方法 es6模板字符串 import(`./path/${myFile}.jsx`)。
                // 注意：
                // ${myFile}变量前边一定要写一个带"/"的字符串。
                // ".jsx" 不能写在变量里，要写在字符串里。
                //目前只能一个页面对应一个js，如何按模块对应js？
               
                item.component = async(()=>import(/* webpackChunkName: "[request]" */ `@/${component}`));
                // console.log("item.component2",item.component)
                return childRouter.push(item)
            }
        })
        return childRouter;
    }
   

    if(targetRouterConfig){
        let { component } = targetRouterConfig;
        return <Route exact path={pathname} component={component} />
    }else{
        if(pathname === '/'){
            return <Redirect to='/login' />
        }else {
           
             //判断没有设置权限菜单，则根据菜单设置上
            if(Main[0].routes.length == 0){
                let menu = menudata;
                let menus = handleRouters(menu);
                // console.log("menus111",menus)
                Main[0].routes = menus;
            }
            // console.log("Main111",Main)
            //如果菜单中包含当前路由，则进入
            let menuConfig = Main[0].routes.filter((item) => {
                console.log("item.path",item.path);
                console.log("pathname",pathname);
                console.log("item.path === pathname",item.path === pathname);
                return item.path === pathname;
            });
            // console.log("Main",Main)
            // console.log("pathname",pathname)
            // console.log("menuConfig",menuConfig)

            // return <Redirect to='/404' />
            if(menuConfig.length != 0){
                return renderRoutes(Main);
            }else{//不包含则进入404
                return <Redirect to='/404' />
            }
        }
    }
   
}
export default RouterAuth;