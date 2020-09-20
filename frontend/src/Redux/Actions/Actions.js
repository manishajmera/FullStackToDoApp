import * as types from "./actiontypes";

import axios from "axios";
const baseUrl=`http://localhost:8011`

//Add any dispatches that send data to a reducer below
export const allBucketList = (data) => ({
  type: types.BUCKETLIST,
  bucketList:data
});

export const dispatchGetAllBuckets = () => {
  return function(dispatch, getState) {
    axios.get(`${baseUrl}/getAllBuckets`).then((data)=>{
      dispatch(allBucketList(data.data.data))
    }).catch((error)=>{
      console.log(error)
    })
  };
}
export const dispatchBucket = (bucketName,listItems) => {
  return function(dispatch, getState) {
    axios.post(`${baseUrl}/addBucket`,{bucketName:bucketName}).then((data)=>{
      console.log(data);
      let t = [...listItems];
      t.push(data.data.data);
      console.log(t);    
      dispatch(allBucketList(t))
    }).catch((error)=>{
      console.log(error)
    })
  };
}
export const dispatchDeleteBucket = (bucketId) => {
  return function(dispatch, getState) {
    axios.post(`${baseUrl}/deleteBucket`,{bucketID:bucketId}).then(()=>{
      dispatch(dispatchGetAllBuckets())
    }).catch((error)=>{
      console.log(error)
    })
  };
}

export const dispatchGetTodoList = (bucketId) => {
  return function(dispatch) {
    axios.get(`${baseUrl}/getAllBucketTodos?bucketID=${bucketId}`).then((data)=>{
      dispatch(allBucketList(data.data.data))
    }).catch((error)=>{
      console.log(error)
    })
  };
}
export const dispatchToDoList = (taskName,bucketId,listItems) => {
  return function(dispatch) {
    axios.post(`${baseUrl}/addToDo`,{taskName:taskName,bucketID:bucketId}).then((data)=>{
      let t = [];
      console.log(data.data.data);
      if(listItems){
        t = [...listItems];      
      }
      t.push(data.data.data);
      console.log(t);    
      dispatch(allBucketList(t))
    }).catch((error)=>{
      console.log(error)
    })
  };
}

export const dispatchDeleteTodo = (todoId,bucketID) => {
  return function(dispatch) {
    axios.post(`${baseUrl}/deleteToDo`,{todoId:todoId}).then(()=>{
      dispatch(dispatchGetTodoList(bucketID))
    }).catch((error)=>{
      console.log(error)
    })
  };
}


export const dispatchUpdateTodo = (todoId,taskName,bucketID) => {
  console.log(todoId,bucketID)
  return function(dispatch) {
    axios.post(`${baseUrl}/updateTodo`,{todoId:todoId,taskName:taskName}).then(()=>{
      dispatch(dispatchGetTodoList(bucketID))
    }).catch((error)=>{
      console.log(error)
    })
  };
}
export const dispatchMarkToDo = (todoId,bucketID) => {
  return function(dispatch) {
    axios.post(`${baseUrl}/markToDoDone`,{todoId:todoId}).then(()=>{
      dispatch(dispatchGetTodoList(bucketID))
    }).catch((error)=>{
      console.log(error)
    })
  };
}
