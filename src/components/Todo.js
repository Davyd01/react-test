import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(""); 

  const addTask = () => {
    if (inputValue.trim() === "") {
      setError("Введите задачу!"); 
      return;
    }
    setTasks([...tasks, { text: inputValue, completed: false, isEditing: false }]);
    setInputValue("");
    setError(""); 
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const enableEditMode = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isEditing = true;
    setTasks(newTasks);
  };

  const saveTask = (index, newText) => {
    if (newText.trim() !== "") {
      const newTasks = [...tasks];
      newTasks[index].text = newText;
      newTasks[index].isEditing = false;
      setTasks(newTasks);
    }
  };

  return (
    <div className="todo-container">
      <h1>TODO</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {task.isEditing ? (
              <input
                type="text"
                defaultValue={task.text}
                onBlur={(e) => saveTask(index, e.target.value)}
              />
            ) : (
              <>
                <span onClick={() => toggleComplete(index)}>{task.text}</span>
                <div className="buttons">
                  <button onClick={() => toggleComplete(index)}>Выполнено</button>
                  <button onClick={() => enableEditMode(index)}>Редактировать</button>
                  <button onClick={() => deleteTask(index)}>Удалить</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <button className="clear-btn" onClick={() => setTasks([])}>
          Удалить все TODO
        </button>
      )}
    </div>
  );
};

export default Todo;
