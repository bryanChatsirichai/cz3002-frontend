import React from 'react'
import './BattleTask.css'
import plusicon from '../../../assets/icons/Plus.png'
function BattleTask({ todo, toggleComplete, removeTask }) {
  function handleCheckBoxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveClick() {
    removeTask(todo.id);
  }

  function chooseColorBasedOnPriority() {
    if (todo.priority === "High") {
      // high color
      return "var(--color-reddish)"
    }
    else if (todo.priority === "Med") {
      // medium color
      return "var(--color-darkish-yellow)"
    }
    else {
      // low color
      return "var(--color-light-blue)"
    }
  }

  return (
    <div className='task-container battletask-container'
      style={{ scale: todo.completed ? "0.9" : "" ,
               backgroundColor: todo.completed ? "gray" : chooseColorBasedOnPriority(),
               filter: todo.completed ? "none" : "",
               border: todo.completed ? "5px solid gray" : "",
               borderStyle: todo.completed ? "ridge" : ""
            }}
    >
      <input type="checkbox"
        onClick={handleCheckBoxClick}
        defaultChecked={todo.completed ? true : false}
        disabled={todo.completed ? true : false}
      />
      <h5
        style={{
          textDecoration: todo.completed ? "line-through" : null,
        }}
      >
        {todo.task}
      </h5>
      <button className='btn' onClick={handleRemoveClick}
              style={{scale: todo.completed ? "1.1" : ""}}
      >
        <img src={plusicon} alt="" />
      </button>
    </div>
  )
}

export default BattleTask