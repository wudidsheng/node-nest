import * as st  from '../myRedux/index.js'
const keyReducer=(state={key:0},action)=>{
    switch (action.type) {
        case 'add':
            return {
                key:++state.key
            }
        case 'plus':
            return {
                key:--state.key
            }
        default:
            return state
    }
}
// const store=createStore(keyReducer)
const store2=st.createStore(keyReducer)
export default store2