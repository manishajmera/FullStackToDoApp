import React, { useEffect, useState } from "react";
import ListItems from "../ListItem/ListItems";
import { connect } from "react-redux";
import "./HeadingWithList.css"
import {
  dispatchGetAllBuckets,
  dispatchBucket,
  dispatchDeleteBucket,
  dispatchGetTodoList,
  dispatchToDoList,
  allBucketList,
  dispatchDeleteTodo,
  dispatchUpdateTodo,
  dispatchMarkToDo
} from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";

const HeadingWithList = ({
  listItems,
  dispatchGetAllBuckets,
  typePlaceholder,
  type,
  dispatchBucket,
  dispatchDeleteBucket,
  dispatchGetTodoList,
  dispatchToDoList,
  allBucketList,
  dispatchDeleteTodo,
  dispatchUpdateTodo,
  dispatchMarkToDo
}) => {
  const [inputValue, setInputValue] = useState("");
  let { id } = useParams();
  useEffect(() => {
    allBucketList([]);
    if (id) {
      id=id.split('_');
      dispatchGetTodoList(id[1]);
    }
    else dispatchGetAllBuckets();
  }, [id, dispatchGetAllBuckets, dispatchGetTodoList]);
  const handelOnKeyDown = (e) => {
    if (e.which == "13") {
      if (inputValue.trim() === "") alert("can't create empty bucket");
      else {
        setInputValue("");
        if (id) {
          id=id.split('_');
          console.log("idasdada",id)
          dispatchToDoList(inputValue, id[1], listItems);
        } else {
          dispatchBucket(inputValue, listItems);
        }
      }
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAction = (e, type,bucketId,todoId) => {
    switch(type) {
      case "deleteBucket":
        dispatchDeleteBucket(bucketId);
        break;
      case "deleteTodo":
        dispatchDeleteTodo(todoId,bucketId);
        break;

    }

  };

  return (
    <div className="container">
      <div className="row todo-list">
        <h1>{type}</h1>
        <input
          placeholder={typePlaceholder}
          type="text"
          onKeyDown={handelOnKeyDown}
          onChange={handleChange}
          value={inputValue}
          className="form-control"
        />
        {listItems && listItems.length>0 && (
          <ListItems
            listItems={listItems}
            listType={id?"":"link" }
            handleAction={handleAction}
            updateTodo={dispatchUpdateTodo}
            handleCheckbox={dispatchMarkToDo}
          />
        )}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    listItems: state.allBucketList,
  };
}

const mapDispatchToProps = {
  dispatchGetAllBuckets,
  dispatchBucket,
  dispatchDeleteBucket,
  dispatchGetTodoList,
  dispatchToDoList,
  allBucketList,
  dispatchDeleteTodo,
  dispatchUpdateTodo,
  dispatchMarkToDo
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadingWithList);
