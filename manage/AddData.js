import React from "react";
import { Button, Modal, Form, Input, Radio ,Select} from 'antd';
import {ajax} from "../js/tools";
const FormItem = Form.Item;
const Option = Select.Option;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
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
      <Modal
        visible={visible}
        title="增加"
        okText="确认"
        onCancel={onCancel}
        onOk={onCreate}
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
);



class AddData extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,  
    }
  }
  showModal(){
    this.setState({ visible: true });
  }
  handleCancel(){
    this.setState({ visible: false });
  }
  handleCreate(){
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      ajax({
        type:"post",
        url:"/stuData/add",
        data:values,
        success:function(data){
          this.props.show();
          form.resetFields();
          this.setState({ visible: false });
        }.bind(this)
      });
    });
  }
  saveFormRef(form){
    this.form = form;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal.bind(this)}>增加</Button>
        <CollectionCreateForm ref={this.saveFormRef.bind(this)} visible={this.state.visible} onCancel={this.handleCancel.bind(this)} onCreate={this.handleCreate.bind(this)}/>
      </div>
    );
  }
}

export default Form.create()(AddData);