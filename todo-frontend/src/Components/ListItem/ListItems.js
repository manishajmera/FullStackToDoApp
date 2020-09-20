import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./listItem.css";

export default function ListItems({
  listItems,
  listType,
  handleAction,
  updateTodo,
  handleCheckbox,
}) {
  const [editBox, setEditBox] = useState("");
  const handleChange = (e) => {
    setEditBox({
      id: editBox.id,
      bucketID: editBox.bucketID,
      value: e.target.value,
    });
  };

  const handelKeyDown = (e) => {
    if (e.which === 13) {
      if (editBox.value.trim() === "") alert("can't create empty todo");
      else {
        updateTodo(editBox.id, editBox.value, editBox.bucketID);
        setEditBox("");
      }
    }
  };
  const bucketList = () => {
    let h = [];
    listItems.map((item, index) => {
      h.push(
        listType ? (
          <div className="bucket-list" key={`${item.title}_${item.bucketID}`}>
            <Link
              to={`/${item.title}_${item.bucketID}`}
              className="col-sm-9 col-xs-9"
            >
              <li>{item.title}</li>
            </Link>
            <div className="col-sm-3 col-xs-3">
              <i
                className="fa fa-trash "
                onClick={(e) => handleAction(e, "deleteBucket", item.bucketID)}
              ></i>
            </div>
          </div>
        ) : (
          <li
            key={`${item.bucketID}-${item.todoID}-${item.title}`}
            className={`bucket-list ${item.markDone ? "crossed" : ""}`}
          >
            <input
              className="col-sm-2"
              type="checkbox"
              defaultChecked={item.markDone}
              onChange={() => {
                handleCheckbox(item.todoID, item.bucketID);
              }}
            />
            <span className="col-sm-6 col-xs-6">{item.title}</span>
            <div className="col-sm-3 col-xs-3">
              <i
                className="fa fa-trash "
                onClick={(e) =>
                  handleAction(e, "deleteTodo", item.bucketID, item.todoID)
                }
              ></i>
            </div>
            <div className="col-sm-3 col-xs-3">
              <i
                className="fa fa-edit "
                onClick={() => {
                  if (editBox.id === item.todoID) setEditBox("");
                  else
                    setEditBox({
                      id: item.todoID,
                      value: item.title,
                      bucketID: item.bucketID,
                    });
                }}
              ></i>
            </div>
            {editBox && editBox.id === item.todoID && (
              <input
                value={editBox.value}
                onChange={handleChange}
                onKeyDown={handelKeyDown}
              />
            )}
          </li>
        )
      );
      return null;
    });
    return h;
  };
  return <ul className="list-unstyled">{bucketList()}</ul>;
}
