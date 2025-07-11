import React from 'react';

import { Context, useInitStore } from './useStore';
import Demo from './Demo';

const UseReducerDemo = () => {
    const [state, dispatch] = useInitStore({}); //创建数据读写api

    return (
        //通过Context.Provider将state和dispatch提供给所有组件，所有标签，组件必须放在Context.Provider内
        <Context.Provider value={{ state, dispatch }}>
            <Demo />
        </Context.Provider>
    );
};

export default UseReducerDemo;
