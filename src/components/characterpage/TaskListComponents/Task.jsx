import React from 'react';
import './Task.css';
import plusicon from '../../../assets/icons/Plus.png';
function Task({ todo, toggleComplete, removeTask }) {
  function handleCheckBoxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveClick() {
    removeTask(todo.id);
  }

  function chooseColorBasedOnPriority() {
    if (todo.priority === 'High') {
      // high color
      return 'var(--color-reddish)';
    } else if (todo.priority === 'Med') {
      // medium color
      return 'var(--color-darkish-yellow)';
    } else {
      // low color
      return 'var(--color-light-blue)';
    }
  }

  return (
    <div
      className="task-container"
      style={{
        scale: todo.completed ? '0.9' : '',
        backgroundColor: todo.completed ? 'gray' : chooseColorBasedOnPriority(),
        filter: todo.completed ? 'none' : '',
        border: todo.completed ? '5px solid gray' : '',
        borderStyle: todo.completed ? 'ridge' : '',
      }}
    >
      <h5 style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.task}</h5>
      <button className="btn" onClick={handleRemoveClick}>
        <img src={plusicon} alt="" />
      </button>
    </div>
  );
}

export default Task;
