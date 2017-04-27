import React from "react";
import Head from "../manage/Header";
import { Layout } from 'antd';
const { Header, Footer, Content , Menu, Icon} = Layout;


export default class Index extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <div>
			<Layout>
		      <Head>{this.props.children}</Head>
		      <Content>{this.props.children}</Content>
		      <Footer style={{backgroundColor:"#404040",textAlign:"center"}}><h1>Manage Design ©2016 Created by TY</h1></Footer>
		    </Layout>
		</div>
	}
}