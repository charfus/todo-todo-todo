import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const First = () => {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const newIndex = list.length + 1;
    setList([
      ...list,
      {
        index: newIndex,
        value: todo
      }
    ]);
    setTodo("");
  };

  const deleteList = e => {
    const deleteId = e.target.parentElement.id;
    const newArray = list.filter(item => {
      return item.value !== deleteId;
    });
    setList(newArray);
  };

  useEffect(() => {
    console.log(list);
  });

  return (
    <div id="first-body">
      <h1 id="title">자기의 일은</h1>
      <form id="form">
        <input
          placeholder="스스로 하자"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>🍗</button>
      </form>
      <ul id="list">
        {list.map(item => (
          <li key={item.value} id={item.value}>
            <span>{item.value}</span>
            <button className="deleteBtn" onClick={deleteList}>
              ☠️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default First;

ReactDOM.render(<First />, document.getElementById("root-second"));
