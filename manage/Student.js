import React from "react";
import AddData from "./AddData";
import UpdateData from "./UpdateData";
import StuTable from "./StuTable";
import {ajax} from "../js/tools";
import {connect} from "react-redux";
import store from "../js/store";
import SearchData from "./SearchData";
import { Layout ,Menu, Icon, Table ,Button ,Modal ,Pagination,Message,Card,Row,Col} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class Student extends React.Component {
	constructor(props){
		super(props);
	}
	show(page,pageSize=4){
		ajax({
			type:"post",
			url:"/stuData/find",
			data:{page:page,rows:pageSize},
			success:function(data){
				console.log(data);
				store.dispatch({
                    type:"SHOW_ALL_STUDENT",
                    data:data
                });
			}.bind(this)
		});
	}
	componentWillMount(){
		this.show();
	}
	render(){
		return <div>
			<Card title="学生管理" style={{height:450,overflow:"auto"}}>
                <Row>
                    <Col span={2}>
                        <AddData show={this.show.bind(this)}></AddData>
                    </Col>
                    <Col span={12}>
                        <SearchData show={this.show.bind(this)}></SearchData>
                    </Col>
                </Row>
                <UpdateData show={this.show.bind(this)}></UpdateData>
				<StuTable show={this.show.bind(this)}></StuTable>
            </Card>		
		</div>
	}
}

const mapStateToProps = function(store){
    return {
        operateReducer:store.operateReducer,
        studentReducer:store.studentReducer
    }
}
export default connect(mapStateToProps)(Student);