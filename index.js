const redux=require('redux')
const reduxLogger=require('redux-logger')

const createStore=redux.createStore
const combineReducers=redux.combineReducers
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()

//action
const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAM'
/*{
    type: BUY_CAKE
    info: 'First redux action'
}*/
//action creator
function buyCake(){
    return{
        type:BUY_CAKE,
        info:'First redux action'
    }
}

function buyIceCream(){
    return{
        type:BUY_ICECREAM,
        //info:'First redux action'
    }
}
//(previousState,action)=>newState

/*const initialState={
    numOfCakes:10,//state
    numOfIceCreams:20
}*/

const initialCakeState={
    numOfCakes:10
}

const initialIceCreamState={
    numOfIceCreams:20
}
const icecreamreducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        

        case BUY_ICECREAM: return{
            ...state,//copy the initial state
            
            numOfIceCreams:state.numOfIceCreams-1
        }

        default: return state
    }
}

const cakereducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state,//copy the initial state
            
            numOfCakes:state.numOfCakes-1
        }

        
        default: return state
    }
}
const rootReducer=combineReducers({
    cake:cakereducer,
    icecream:icecreamreducer
})
const store=createStore(rootReducer,applyMiddleware(logger))//creating redux store
console.log('Initial State',store.getState())//getting initial state
//creating listener and subscribe

//const unsubscribe=store.subscribe(()=>{console.log('updated state',store.getState())})

const unsubscribe=store.subscribe(()=>{})
//dispatching action
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
//unsubscribe/end the listener
unsubscribe()

console.log('Final State',store.getState())
//console.log(store.cake.numOfCakes)-dont work
//console.log(store.icecream.numOfIceCreams)-dont work