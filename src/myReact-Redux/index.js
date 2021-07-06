import { createContext, useContext,useState } from "react";

const CountContext = createContext(null);
function Provider(props) {
    const [state,setState]=useState(props.store.getState())
    props.store.subscribe(()=>{setState(props.store.getState())})
  return (
    <CountContext.Provider
      value={{ value: state, dispatch: props.store.dispatch }}
    >
      {props.children}
    </CountContext.Provider>
  );
}


function connect(mapState, mapProps) {
  return function(UI){
     function XX(){
        const {value,dispatch}=useContext(CountContext)
        // 接收一个ui组件返回一个容器组件
        return (<h><UI {...mapState(value)} {... mapProps(dispatch)}></UI></h>
    )}
    return XX
  }

}
export { Provider, connect };
