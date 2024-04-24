
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import "bootstrap/dist/css/bootstrap.min.css";

const TodoList = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['todoList']);
  const [tasks, setTasks] = useState(cookies.todoList || []);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setCookie('todoList', tasks);
  }, [tasks, setCookie]);

  const userInput = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTasks = [...tasks, inputValue];
      setTasks(newTasks);
      setCookie(`task_${newTasks.length - 1}`, inputValue); 
      setInputValue('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    removeCookie(`task_${index}`); 
  };

  
  const clearList = () => {
    setTasks([]);
    removeCookie('todoList');
    for (const key in cookies) {
      if (key.startsWith( 'task_')) {
        removeCookie(key);
      }
    }
  };

  return (
    <div><center>
      <h1>My To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={userInput}
        placeholder="write task"
      />
      <button class="btn btn-primary" onClick={addTask}>Add Task</button>
      <button  class="btn btn-danger"onClick={clearList}>ClearAll (List & cookies)  </button>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button  class="btn btn-secondary"onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ol></center>
    </div>
  );
};

export default TodoList;