import React,{useState} from "react";
import { Link } from "react-router-dom";

export default function ListItems({ listItems, listType, handleAction,updateTodo,handleCheckbox }) {
  const [editBox,setEditBox]=useState('');
  const handleChange = (e)=>{
    setEditBox({
      id:editBox.id,
      bucketID:editBox.bucketID,
      value:e.target.value
    })
  }

  const handelKeyDown = (e)=>{
    if (e.which == "13") {
      if (editBox.value.trim() === "") alert("can't create empty todo");
      else {
        console.log(editBox);
        updateTodo(editBox.id,editBox.value,editBox.bucketID);
        setEditBox("");
      }
    }
  }
  const bucketList = () => {
    let h = [];
    listItems.map((item, index) => {
      h.push(
        listType ? (
          <div>
            <Link to={`/${item.title}_${item.bucketID}`} key={index}>
              <li>{item.title}</li>
            </Link>
              <button
              onClick={(e) => handleAction(e, "deleteBucket", item.bucketID)}
            >
                <span aria-hidden="true">&times;</span>
            </button>
           </div>
        ) : (
          <li key={index} className={`${item.markDone ? 'crossed' : ''}`}>
            <input type="checkbox" defaultChecked={item.markDone} onChange={()=>{handleCheckbox(item.todoID,item.bucketID)}}/> 
            <label>{item.title}</label>
            <button onClick={(e) => handleAction(e, "deleteTodo",item.bucketID,item.todoID)}>D</button>{" "}
            <button onClick={() => setEditBox({id:item.todoID,value:item.title,bucketID:item.bucketID})}>E</button>
            {editBox && editBox.id==item.todoID && <input value={editBox.value} onChange={handleChange} onKeyDown={handelKeyDown}/>}
          </li>
        )
      );
    });
    return h;
  };
  return  <ul className="list-unstyled">{bucketList()}</ul> ;
}
