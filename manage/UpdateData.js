import React from "react";
import store from "../js/store";
import {ajax} from "../js/tools";
import {connect} from "react-redux";
import { Button, Modal, Form, Input, Radio ,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Update extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }
  handleCancel(){
      store.dispatch({
          type:"SHOW_UPDATE_MODAL",
          updateVisible:false
      });
  }
  handleCreate(){
    var values = this.props.form.getFieldsValue();
    values._id = this.props.studentReducer.student._id;
    console.log("values",values);
    ajax({
        type:"post",
        url:"/stuData/update",
        data:values,
        success:function(){
            this.props.show();
        }.bind(this)
    });
    store.dispatch({
        type:"SHOW_UPDATE_MODAL",
        updateVisible:false
    });
  }
    
  render() {
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
    return (
      <Modal visible={this.props.operateReducer.updateVisible} title="修改" okText="确认" onCancel={this.handleCancel.bind(this)} 
      onOk={this.handleCreate.bind(this)}
      >
        <Form layout="vertical" >
          <FormItem label="姓名" {...formItemLayout} labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}>
            {getFieldDecorator('name', {
              rules: [{ required: true}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="年龄" {...formItemLayout} labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}>
            {getFieldDecorator('age', {
              rules: [{ required: true}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="性别" labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}>
              {getFieldDecorator('sex', {
                rules: [{ required: true}],
              })(
                <Select>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </FormItem>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = function(store){
    return {
        operateReducer:store.operateReducer,
        studentReducer:store.studentReducer
    }
}
export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props){
      return {
        name:{value:props.studentReducer.student.name},
        age:{value:props.studentReducer.student.age},
        sex:{value:props.studentReducer.student.sex}
      }
   } 
})(Update));
