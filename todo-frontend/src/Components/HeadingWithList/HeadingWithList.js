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
      dispatchGetTodoList(id.split('_')[1]);
    }
    else dispatchGetAllBuckets();
  }, [id, dispatchGetAllBuckets, dispatchGetTodoList,allBucketList]);
  const handelOnKeyDown = (e) => {
    if (e.which === 13) {
      if (inputValue.trim() === "") alert("can't create empty bucket");
      else {
        setInputValue("");
        if (id) {
          dispatchToDoList(inputValue, id.split('_')[1], listItems);
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
      default:
        break;

    }

  };

  return (
    <div className="container">
      <div className="row todo-list">
        <h1>{id ? `${id.split("-")[0]} Bucket` : "To Do Bucket List"}</h1>
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
