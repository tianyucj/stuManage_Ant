import React from "react";
import {Input,Select,Col} from "antd";
import {ajax} from "../js/tools";
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

class SearchStudent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    valueData(value){
      console.log(value);
      this.setState({
        value:value
      });
    }
    searchData(value){

    }
    render(){
        return <div >
        <InputGroup compact>
          <Select defaultValue="name" onChange={this.valueData.bind(this)}>
            <Option value="name">姓名</Option>
            <Option value="age">年龄</Option>
          </Select>
          <Search style={{ width: '50%' }} onSearch={value => console.log(value)} placeholder="搜索" />
        </InputGroup>
        </div>
    }
}
export default SearchStudent;
