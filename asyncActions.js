const redux=require('redux')//import redux
const createStore=redux.createStore//create redux store
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')


//initial state
const initialState={
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE'

const fetchUsersRequest=()=>{
    return {
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess=(users)=>{
    return {
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure=()=>{
    return {
        type:FETCH_USERS_FAILURE,
        payload:users
    }
}
//reducer
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST: 
            return{
            ...state,
            loading:true
        }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading:false,
                users:[],
                error:action.payload
            }
            
    }
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            //response.data is the array of users
            const users=response.data.map(user=>user.id)
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
            //error.message is the error description
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

//axios:request to an api endpoint
//redux_thunk :define async action creators ,middleware

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())
