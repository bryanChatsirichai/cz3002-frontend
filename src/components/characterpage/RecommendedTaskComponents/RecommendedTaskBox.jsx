import React, { useState, useEffect } from 'react'
import './RecommendedTaskBox.css'
import RecommendedTaskList from './RecommendedTaskList'
import { v4 as uuidv4, v4 } from 'uuid';
import repeaticon from '../../../assets/icons/Repeat.png'

const LOCAL_STORAGE_KEY = "TASKBOX"
const LOCAL_TASKDISPLAY_KEY = "DISPLAYTASK"

const NUMBER_OF_TASK = 3;

const AllRecommendedTask = [
    { id: uuidv4(), task: "Do homework", completed: false, priority: "High" },
    { id: uuidv4(), task: "Take out the trash", completed: false, priority: "Low" },
    { id: uuidv4(), task: "Clean your room", completed: false, priority: "Medium" },
    { id: uuidv4(), task: "Wash the dishes", completed: false, priority: "High" },
    { id: uuidv4(), task: "Revise your work", completed: false, priority: "Medium" },
    { id: uuidv4(), task: "Walk the dog", completed: false, priority: "High" },
]

const RecommendedTaskBox = () => {
    const [tasksRef, setRef] = useState([]); // ref to actual task list
    const [taskToDisplay, setDisplay] = useState([]);

    useEffect(() => {
        const storageTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageTask) {
            setRef(storageTask);
        }

        const displayTask = JSON.parse(localStorage.getItem(LOCAL_TASKDISPLAY_KEY))
        if(displayTask){
            setDisplay(displayTask);
        }
        else{
            selectRandomTask(NUMBER_OF_TASK);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasksRef))
    }, [tasksRef]);

    useEffect(() => {
        localStorage.setItem(LOCAL_TASKDISPLAY_KEY, JSON.stringify(taskToDisplay))
    }, [taskToDisplay]);

    function selectRandomTask(number) {
        let tmp = []
        setDisplay(tmp);
        let checkArr = []

        for(let i = 0; i < AllRecommendedTask.length; i ++){
            checkArr[i] = i;
        }
        let t = 0;
        for (let i = 0; i < number; i++) {
            t = getRandomValue(0, checkArr.length - 1); // random index for array of index in checkarr
            let index = checkArr[t];
            checkArr.splice(t, 1); // remove index from check arr
            tmp.push(AllRecommendedTask[index]);
        }
        setDisplay(tmp);
    }
    function getRandomValue(from, to,) {
        return Math.floor(Math.random() * to) + from;
    }
    function removeTask(id) {
        setDisplay(taskToDisplay.filter(task => task.id !== id))
    }
    function handleAcceptTask(id) {
        setDisplay(
            taskToDisplay.map(todo => {
                if (todo.id === id) {
                    addTaskToTaskList(todo)
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        );
    }

    function addTaskToTaskList(task) {
        setRef([...tasksRef, task]);
    }
    return (
        <div className='recommendedtaskbox-container'>
            <div className='box'>
                <h2>Recommendations</h2>
                <RecommendedTaskList tasktodisplay={taskToDisplay} removeTask={removeTask} accepted = {handleAcceptTask}/>
                <button className='btn' onClick={() => selectRandomTask(NUMBER_OF_TASK)}><img src={repeaticon} alt="" /></button>
            </div>
        </div>
    )
}

export default RecommendedTaskBox