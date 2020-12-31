import React ,{useEffect,useState}from 'react';

import './mock' // simulation data 路径index.js可省略
import {Button,Table,message} from 'antd'
import { getMoneyIncomePay ,removeMoney, batchremoveMoney,addMoney } from "./api/Api";

const App = ()=>{
  const columns=[
    {title:"id",dataIndex:"id",key:'id'},
    {title:"用户",dataIndex:"username",key:'username'},
    {title:"address",dataIndex:"address",key:'address'},
    {title:"accoutCash",dataIndex:"accoutCash",key:'accoutCash'},
    {title:"createTime",dataIndex:"createTime",key:'createTime'},
    {title:"income",dataIndex:"income",key:'income'},
  ]
  const [dataSource,setDataSource]=useState([]);
  useEffect(()=>{
    getMoneyList();
  },[])
  const getMoneyList = ()=>{
    getMoneyIncomePay({}).then(res => {
      console.log("getMoneyList",res)
      setDataSource(res)
   })
  }
  const addAnMoney = ()=>{
    addMoney({
      username:"xuhuanhuan",
      address:"000", 
      income:"100",
      pay:"20" ,
      accoutCash:"20", 
      incomePayType:'00'
    }).then(res=>{
      message.success(res.message)
      getMoneyList();
    })
    
  }
  return(
    <>
    <div>
      <Button type="primary" onClick={addAnMoney}>新增</Button>
      <Button type="primary">编辑</Button>
      <Button type="primary">删除</Button>
      <Table columns={columns} dataSource={dataSource.moneyList} rowKey="id" size="small"/>
    </div>
    </>
    
  )
}
export default App;


