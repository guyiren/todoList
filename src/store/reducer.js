import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM,DELETE_TODO_ITEM} from './actionTypes'
const defaultState = {
    inputValue:'',
    list:[]
    //仓库的默认数据
};
//只需返回一个函数
// reducer负责整个应用的数据，怎么处理怎么存都是由他负责
//state指的是整个storm仓库中存储的数据
export default (state = defaultState, action)=>{
    if (action.type === CHANGE_INPUT_VALUE) {
        //reducer可以接收state，但是不能修改State
        const newState = JSON.parse(JSON.stringify(state));
        newState.inputValue = action.value;
        //返回给了storm
        return newState;
    }
    if (action.type === ADD_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue = '';
        return newState;
    }
    if (action.type === DELETE_TODO_ITEM) {
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index,1);
        return newState;
    }
    return state;
}
