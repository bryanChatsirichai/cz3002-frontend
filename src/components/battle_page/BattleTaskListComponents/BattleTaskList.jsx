import React from 'react'
import BattleTask from './BattleTask'
import './BattleTaskList.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function BattleTaskList({todos, toggleComplete, removeTask}){
  const [animationParent] = useAutoAnimate()

  return (
    <ul className='tasklist-container battletasklist-container' ref={animationParent}>
        {
          todos.map(todo => (<BattleTask 
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

export default BattleTaskList