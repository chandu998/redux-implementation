import { all, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "@redux-saga/core";

 function redux_module (){

 const BUY_CAKE= 'BUY_CAKE';
 const SELL_CAKE= 'SELL_CAKE';
 const BUY_CAKE_SUCCESS= 'BUY_CAKE_SUCCESS';
 const SELL_CAKE_SUCCESS= 'SELL_CAKE_SUCCESS';

 const BuyCake =()=>{
    return{
        type:BUY_CAKE
 }
 }
  const SellCake =()=>{
    return{
        type:SELL_CAKE
 }
 }

 const InitialNumber={
    numberOfCakes : 10
}

const NewReducer =(state = InitialNumber,action)=>{
    console.log('action',state)
switch(action.type){
    case BUY_CAKE_SUCCESS : return {
        ...state,
        numberOfCakes : state.numberOfCakes - 1
    }
    case SELL_CAKE_SUCCESS : return {
        ...state,
        numberOfCakes : state.numberOfCakes + 1
    }
    default: return state
}
}



function* buyCake (){
    yield put ({type : BUY_CAKE_SUCCESS})
}
function* sellCake (){
    yield put ({type: SELL_CAKE_SUCCESS})
}


 function* watchUser (){
    yield all([takeLatest(BUY_CAKE,buyCake),
takeLatest(SELL_CAKE,sellCake)])
}



const sagaMiddleware = createSagaMiddleware()
 const Store = createStore(NewReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchUser);

 };

 module.exports=redux_module