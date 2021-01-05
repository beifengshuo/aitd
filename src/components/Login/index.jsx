import React from 'react';
import {Link } from "react-router-dom";
const Login =()=>{
    return(
       <>
       登录页
       <div> <Link to={`/home`}>点击进入</Link></div>
       </>
    )
}
export default Login;
