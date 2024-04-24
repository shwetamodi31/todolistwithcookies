// import React, { useState, useEffect } from 'react';
// import { useCookies } from 'react-cookie';

// const TodoList = () => {
//   const [cookies, setCookie] = useCookies(['todos']);
//   const [todos, setTodos] = useState(cookies.todos || []);
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     setCookie('todos', todos);
//   }, [todos, setCookie]);

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleAddTodo = () => {
//     if (inputValue.trim() !== '') {
//       setTodos([...todos, inputValue]);
//       setInputValue('');
//     }
//   };

//   const handleRemoveTodo = (index) => {
//     const newTodos = [...todos];
//     newTodos.splice(index, 1);
//     setTodos(newTodos);
//   };

//   return (
//     <div>
//       <h1>To-Do List</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         placeholder="Enter a new task"
//       />
//       <button onClick={handleAddTodo}>Add</button>
//       <ul>
//         {todos.map((todo, index) => (
//           <li key={index}>
//             {todo}
//             <button onClick={() => handleRemoveTodo(index)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;
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
      setCookie(`task_${newTasks.length - 1}`, inputValue); // Unique name for each task's cookie
      setInputValue('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    removeCookie(`task_${index}`); // Remove task's cookie
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