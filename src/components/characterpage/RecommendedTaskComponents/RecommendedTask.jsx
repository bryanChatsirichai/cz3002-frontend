import React from 'react'
import './RecommendedTask.css'
import completeicon from '../../../assets/icons/Complete.png'
const RecommendedTask = ({ todo, toggleComplete, removeTask }) => {
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
        <div className='task-container recommended-task'
            style={{
                scale: todo.completed ? "0.9" : "",
                backgroundColor: todo.completed ? "gray" : chooseColorBasedOnPriority(),
                filter: todo.completed ? "none" : "",
                border: todo.completed ? "5px solid gray" : "",
                borderStyle: todo.completed ? "ridge" : ""
            }}
        >
            <h5>
                {todo.task}
            </h5>
            {/* turn this button into toggle complete for acceptance */}
            <button className='btn' onClick={handleCheckBoxClick}><img src={completeicon} alt="" /></button>
        </div>
    )
}

export default RecommendedTask