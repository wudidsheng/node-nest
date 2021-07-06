import React, { Component } from 'react'
import {connect} from "./myReact-Redux/index.js";
 class App extends Component {
  add=()=>{ 
    this.props.add()
  }
  render() {
    return (
      <div>
       <button onClick={this.add}>加</button>
       <button onClick={this.props.plus}>见</button>
         {this.props.keyx}
      </div>
    )
  }
}
export default connect((state)=>({keyx:state.key}),dispatch=>({add:()=>dispatch({type:'add'}),plus:()=>dispatch({type:'plus'})}))(App)

