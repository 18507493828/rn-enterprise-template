import { useReducer, useContext, createContext } from 'react'; //首先引入需要的hooks

export const TYPES = {
    CHANGE_STATE: 'CHANGE_STATE',
}; //编写操作需要的TYPES

//添加初始化数据

const initialState = {
    title: 'nihao',
}; //添加初始化数据

const reducer = (state, action) => {
    //   switch (action.type) {
    //     case TYPES.CHANGE_STATE:
    return { ...state, ...action };
    //     default:
    //       return state;
    //   }
}; //建一个reducer纯函数

export const useInitStore = (_initialState = {}) => {
    return useReducer(reducer, { ...initialState, ..._initialState });
}; //使用useReducer生成一个可以创建数据操作读写API的函数

export const Context = createContext(null); //创建Context,暴露给外层组件用

export const useStore = () => {
    return useContext(Context) || {};
}; //使用useContext和Context获取读写API,这里封装成一个函数，外层组件可直接通过调用useStore函数获取
