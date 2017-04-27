import React from "react";
import { Layout ,Menu, Icon} from 'antd';
import Student from "./Student";
import {ajax} from "../js/tools";
const { Header, Footer, Sider, Content } = Layout;

export default class Manage extends React.Component {
    constructor(props){
        super(props);

    }
	render(){
		return (
			<Layout>
			  <Sider style={{margin:"24px 16px 24px"}} breakpoint="lg" collapsedWidth="0"
			    onCollapse={(collapsed, type) => { console.log(collapsed, type); }} >
			    <div className="logo" />
			    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
			      <Menu.Item key="stuManage">
			        <Icon type="user" />
			        <span className="nav-text">学生管理</span>
			      </Menu.Item>
			      <Menu.Item key="teacherManage">
			        <Icon type="video-camera" />
			        <span className="nav-text">教师管理</span>
			      </Menu.Item>
			      <Menu.Item key="contactManage">
			        <Icon type="upload" />
			        <span className="nav-text">课程管理</span>
			      </Menu.Item>
			    </Menu>
			  </Sider>
			    <Content style={{ margin: '24px 16px 24px' }}>
			      	{this.props.children}
			    </Content>
			</Layout>      
		)
	}
}