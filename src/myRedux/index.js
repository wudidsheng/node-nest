const createStore=function(reducer){
    const cbArray=[];
    // 存在内部状态数据
    let state=reducer(undefined,{type:Symbol()});
    // 分发action，更新state
    function dispatch(action){
        state=reducer(state,action)
        cbArray.map(item=>item())
    }
    // 获取state
    function getState(){
        return state
    }
    // 绑定监听回调
    function subscribe(fn){
        cbArray.push(fn)
    }
    return {
        getState,
        subscribe,
        dispatch,
    }
}

function combineReducers(reducers){
    // 每个reducer执行一次
    return (state={},action)=>{
        const newState=Object.keys(reducers).reduce((parve,key)=>{
                parve[key]=reducers[key](state[key],action)
                return parve;
        },{})
        return newState;
    }
}

export {createStore,combineReducers}