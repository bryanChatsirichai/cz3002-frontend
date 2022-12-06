import React from 'react'
import RecommendedTask from './RecommendedTask'
import './RecommendedTaskList.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const RecommendedTaskList = ({ tasktodisplay, removeTask, accepted }) => {
    const [animationParent] = useAutoAnimate()

    return (
        <ul className='layout-scroll recommendedtasklist-container' ref={animationParent}>
            {
                tasktodisplay.map(todo => (<RecommendedTask
                    key={todo.id}
                    todo={todo}
                    toggleComplete={accepted}
                    removeTask={removeTask}
                />
                )
                )
            }
        </ul>
    )
}

export default RecommendedTaskList