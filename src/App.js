import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  const TODO_LS = "TODOLIST";

  const setLocalstorage = () => {
    localStorage.setItem(TODO_LS, JSON.stringify(list));
  };
  const getLocalstorage = () => {
    const parsedList = JSON.parse(localStorage.getItem(TODO_LS));
    if (parsedList) setList(parsedList);
  };

  const deleteHandle = e => {
    const parentTag = e.target.parentElement;
    const revisedList = list.filter(item => {
      return item.text !== parentTag.id;
    });
    setList(revisedList);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newIndex = list.length + 1;
    setList([
      ...list,
      {
        index: newIndex,
        text: todo
      }
    ]);
    setTodo("");
  };

  useEffect(() => {
    getLocalstorage();
  }, []);

  useEffect(() => setLocalstorage(), [list]);

  return (
    <div>
      <div className="todo-input">
        <form>
          <input value={todo} onChange={e => setTodo(e.target.value)}></input>
          <button onClick={handleSubmit}>🍓</button>
        </form>
      </div>

      <div>
        {list !== null ? (
          list.map(item => (
            <li key={item.text} id={item.text}>
              <span>{item.text}</span>
              <button onClick={deleteHandle}>❌</button>
            </li>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
