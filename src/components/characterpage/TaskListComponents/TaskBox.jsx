
import React, { useState, useEffect } from 'react';
import './TaskBox.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import AxiosInterface from '../../Misc/AxiosInterface';


const LOCAL_STORAGE_KEY = 'TASKBOX';
const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();

const TaskBox = () => {
  //array to render
  const [tasks, setTasks] = useState([]);

  //initial render only
  useEffect(() => {
    getAllTask();
  }, []);

  //re-render when tasks is updated
  useEffect(() => {
    //console.log('rerender');
  }, [tasks]);

  //get all task related specific user
  const getAllTask = async () => {
    //not null key exist in local storage
    if (AUTH_TOKEN) {
      let headers = {
        auth_token: AUTH_TOKEN,
      };
      try {
        let response = await axiosInterface.getData('/home/task', headers);
        //all tasks associated to specific user
        const tasksArray = response.data;
        // console.log(tasksArray);
        if (tasksArray.length === 0) {
          //nothing to render
          console.log('User have no task');
          return;
        }
        setTasks(tasksArray);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  //add task to tasks array
  function addTask(task) {
    setTasks([...tasks, task]);
  }

  function toggleComplete(id) {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

  function clearAllTask() {
    //delete all task associated to user in DB
    tasks.forEach((task) => {
      deleteTask(task.id);
    });
    setTasks([]);
  }

  function clearCompletedTask() {
    //remove completed task from DB
    tasks.forEach((task) => {
      if (task.completed === true) {
        deleteTask(task.id);
      }
    });
    //remove completed tasks from task array
    setTasks(tasks.filter((task) => task.completed === false));
  }
  //delete task based on id, when the x click
  function removeTask(id) {
    deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //remove specific task from DB
  const deleteTask = async (id) => {
    let headers = {
      auth_token: AUTH_TOKEN,
    };
    await axiosInterface.removeData('/home/task', id, headers);
  };

  return (
    <div className="taskbox-container">
      <div className="box">
        <h2>Task List</h2>
        <div className="taskbox-btns">
          <button className="btn clearall" onClick={clearAllTask}>
            <h5>Clear All</h5>
          </button>
          <button className="btn clearcompleted" onClick={clearCompletedTask}>
            <h5>Clear Completed</h5>
          </button>
        </div>
        <TaskForm addTask={addTask} />
        <TaskList todos={tasks} toggleComplete={toggleComplete} removeTask={removeTask} />
      </div>
    </div>
  );
};

export default TaskBox;
