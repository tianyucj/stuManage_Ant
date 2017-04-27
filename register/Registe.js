import React from "react";
import {ajax} from "../js/tools";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,Card ,notification} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Registe extends React.Component{
	constructor(props){
		super(props);
		this.state =  {
			confirmDirty: false
		}
	}
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	      	delete values.confirm;
	      	ajax({
	      		type:"poet",
	      		url:"/stuMsg/add",
	      		data:values,
	      		success:function(data){
	      			notification['success']({
					    message: '注册提醒',
					    description: '账号注册已成功',
					});
					this.props.router.replace("/Manage");
	      		}.bind(this)
	      	});
	        console.log('Received values of form: ', values);
	      }
	    });
	}
  handleConfirmBlur(e){
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword (rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback){
	    const form = this.props.form;
	    if (value && this.state.confirmDirty) {
		      form.validateFields(['confirm'], { force: true });
		}
	    callback();
	}
	checkName(rule, value, callback){
		ajax({
			type:"poet",
      		url:"/stuMsg/find",
      		data:{username:value},
      		success:function(data){
      			if(data.length >0){
      				callback("重名");
      			}else{
      				callback();
      			}
      		}
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 14,
	          offset: 6,
	        },
	      },
	    };
	    return (
	    	<Row type="flex" justify="center">
      		<Col span={10}>
      			<Card title="免费注册" bordered={false} style={{marginTop:50}}> 
		      <Form onSubmit={this.handleSubmit.bind(this)}>
		        <FormItem {...formItemLayout} label={(
		            <span>
		              用户名&nbsp;
		              <Tooltip title="What do you want other to call you?">
		                <Icon type="question-circle-o" />
		              </Tooltip>
		            </span>
		          )} hasFeedback labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}>
		          {getFieldDecorator('username', {
		            rules: [{ required: true, message: '请输入用户名', whitespace: true },
		            	{
		            		pattern:/^.{6,20}$/,
		            	},{
		            		validator: this.checkName.bind(this),
		            	}],
		          })(
		            <Input />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="密码" hasFeedback labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}>
		          {getFieldDecorator('pwd', {
		            rules: [{
		              required: true, message: '请输入密码',
		            }, {
		              validator: this.checkConfirm.bind(this),
		            },{
		            	pattern:/^\w{6,20}$/,
		            }],
		          })(
		            <Input type="password" />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="确认密码" hasFeedback labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}>
		          {getFieldDecorator('confirm', {
		            rules: [{
		              required: true, message: '请输入确认密码',
		            }, {
		              validator: this.checkPassword.bind(this),
		            }],
		          })(
		            <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="邮箱" hasFeedback labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}>
		          {getFieldDecorator('email', {
		            rules: [{
		              type: 'email', message: 'The input is not valid E-mail!',
		            }, {
		              required: true, message: '请输入邮箱地址',
		            }],
		          })(
		            <Input />
		          )}
		        </FormItem>
		        <FormItem {...tailFormItemLayout}>
		          <Button type="primary" htmlType="submit" size="large">注册</Button>
		        </FormItem>
		      </Form>
		       </Card>
       		 </Col>
        	</Row>
		    );
  
	}
}
export default Form.create()(Registe);
