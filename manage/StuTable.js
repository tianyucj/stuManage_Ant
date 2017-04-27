import React from "react";
import UpdateData from "./UpdateData";
import AddData from "./AddData";
import {ajax} from "../js/tools";
import {connect} from "react-redux";
import store from "../js/store";

import { Layout ,Menu, Icon, Table ,Button ,Modal ,Pagination,Message} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class StuTable extends React.Component {
	constructor(props){
		super(props);
	}
	delData(id) {
	  Modal.confirm({
	    title: 'Confirm',
	    content: '是否删除当前数据？',
	    okText: 'OK',
	    cancelText: 'Cancel',
	    onOk:function(){
	    	ajax({
				type:"post",
				url:"/stuData/del",
				data:{_id:id},
				success:function(data){
					console.log(data);
					Message.info("删除成功！");
					this.props.show();
				}.bind(this)
			});
	    }.bind(this)
	  });
	}
	showData(id){
		ajax({
			type:"post",
			url:"/stuData/find",
			data:{_id:id},
			success:function(data){
				store.dispatch({
                    type:"SHOW_UPDATE_MODAL",
                    updateVisible:true
                });
                store.dispatch({
                    type:"SHOW_STUDENT",
                    student:data
                });
				
			}.bind(this)
		});
	}
	render(){
		console.log("studentReducer",this.props.studentReducer.data);
		const data = this.props.studentReducer.data;
		const pagination = {
			current:data.curpage,
			total:data.total,
			pageSize:data.eachpage,
			pageSizeOptions:['3','5','10'],
			showSizeChanger:true,
			onChange:function(page, pageSize){
				this.props.show(page,pageSize);
			}.bind(this),
			onShowSizeChange:function(page, pageSize){
				this.props.show(page,pageSize);
			}.bind(this)
		};
		const columns = [{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '年龄',
		  dataIndex: 'age',
		  key: 'age',
		}, {
		  title: '性别',
		  dataIndex: 'sex',
		  key: 'sex',
		}, {
		  title: '操作',
		  key: 'action', 
		  render: (text, record) =>(
		    <span>
			  <Button type="primary" onClick={()=>this.showData(text._id)}>修改</Button>
		      <Button type="default" onClick={()=>this.delData(text._id)}>删除</Button>
		    </span>
		  ),
		}];
		
		return <div>
				<Table columns={columns} dataSource={this.props.studentReducer.data.rows} pagination={pagination} scroll={{ y: 340 }}/>	
			</div>
	}
}
const mapStateToProps = function(store){
	return {
		studentReducer:store.studentReducer
	}
}
export default connect(mapStateToProps)(StuTable);