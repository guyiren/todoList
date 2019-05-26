import React,{Component} from 'react';
import 'antd/dist/antd.css';
import { Input,Button,List} from 'antd';
import store from './store';
import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM,DELETE_TODO_ITEM} from './store/actionTypes'


class TodoList extends Component{
  //获取这个公用数据
  constructor(props){
    super(props);
    //getState获取数据的方法
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    //组件订阅这个storm
    this.handStoreChange = this.handStoreChange.bind(this);
    store.subscribe(this.handStoreChange);
  }
  render() {
    return (
    <div style={{marginTop:'10px',marginLeft:'10px'}}>
      <div>
        <Input
            value={this.state.inputValue}
            placeholder={"todo info"}
            style={{width:'300px',marginRight:'10px'}}
            onChange={this.handleInputChange}
        />
        <Button
            type="primary"
            onClick={this.handleBtnClick}
        >提交</Button>
      </div>
      <List
          style={{marginTop:'10px',width:'500px'}}
          bordered
          // 这个列表到底要渲染什么内容
          dataSource={this.state.list}
          // 怎么渲染
          renderItem={(item,index) => (
              <List.Item onClick={this.handleItemDelete.bind(this,index)}>
               {item}
              </List.Item>
          )}
      />
    </div>
  )
  }
  handleInputChange(e){
    //action里是一个对象，描述一下做什么样的事情
    const action = {
      type: CHANGE_INPUT_VALUE,
      value:  e.target.value
    };
    // 把action的这句话传给storm，然后storm会把已有的数据和action传的数据一同发给reducers
    store.dispatch(action);
  }
  //storm发生变化
  handStoreChange(){
    //重新取一次数据。这个数据就与storm里的数据同步了变成最新的数据了
    // 实现了input框与storm里的数据联动的效果了
    this.setState(store.getState());
  }
  //=========================================================
  handleBtnClick(){
    const action = {
      type: ADD_TODO_ITEM
    };
    store.dispatch(action);
  }
  handleItemDelete(index){
    const action = {
      type: DELETE_TODO_ITEM,
      index
    };
    store.dispatch(action);
  }
}
export default TodoList;
