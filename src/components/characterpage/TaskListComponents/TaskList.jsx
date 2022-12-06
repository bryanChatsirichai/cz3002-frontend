import React from 'react'
import Task from './Task'
import './TaskList.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function TaskList({todos, toggleComplete, removeTask}){
  const [animationParent] = useAutoAnimate()

  return (
    <ul className='layout-scroll tasklist-container' ref={animationParent}>
        {
          todos.map(todo => (<Task 
                              key={todo.id} 
                              todo={todo} 
                              toggleComplete={toggleComplete} 
                              removeTask={removeTask}
                              />
                            )
                    )
        }
    </ul>
  )
}

export default TaskList