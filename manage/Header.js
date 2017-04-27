import React from "react";
import { Menu, Icon } from 'antd';
import {Link} from "react-router";
import { Layout } from 'antd';
const { Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Head extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      current: 'login'
    }
  }
  handleClick(e){
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }
  render() {
    return (
      <Header style={{backgroundColor:"#fff"}}>
      <h1 style={{float:"left"}}>学生管理系统</h1>
      <Menu onClick={this.handleClick.bind(this)} style={{float:"right",paddingTop:14}} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="login">
          <Link to="/Login">登录</Link>
        </Menu.Item>
        <Menu.Item key="registe">
          <Link to="/Registe">注册</Link>
        </Menu.Item>      
      </Menu>
      </Header>
    );
  }
}
