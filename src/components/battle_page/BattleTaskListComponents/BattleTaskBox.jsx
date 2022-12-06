import React, { useState, useEffect } from 'react';
import './BattleTaskBox.css';
import BattleTaskList from './BattleTaskList';
import AxiosInterface from '../../Misc/AxiosInterface';
const LOCAL_STORAGE_KEY = 'TASKBOX'; // Needs to be the same as taskbox to retrive the same list of task
const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();

const h_DMG = 20;
const m_DMG = 10;
const l_DMG = 5;

const BattleTaskBox = ({ setTaskComplete, damageToDeal }) => {
  const [tasks, setTasks] = useState([]);

  //   useEffect(() => {
  //     const storageTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //     if (storageTask) {
  //       setTasks(storageTask);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  //   }, [tasks]);

  //initial render only
  useEffect(() => {
    getAllTask();
  }, []);
  //re render
    // useEffect(() => {
    //   //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    // }, [tasks]);

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
  function toggleComplete(id) {
    setTasks(
      tasks.map((todo) => {
        if (todo.id === id) {
          let dmg = computeDamageToDeal(todo.priority);
          damageToDeal(dmg);
          //trigger other component
          setTaskComplete(true);
          //update task in DB
          updateTask(id, { completed: !todo.completed }); //toggle complete status
          //update tasks array
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

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

  //update specific task completeness
  const updateTask = async (id, update) => {
    let headers = {
      auth_token: AUTH_TOKEN,
    };
    await axiosInterface.patchData('/home/task', id, update, headers);
  };

  function computeDamageToDeal(priority) {
    if (priority === 'High') {
      return h_DMG;
    } else if (priority === 'Med') {
      return m_DMG;
    } else {
      return l_DMG;
    }
  }

  return (
    <div className="taskbox-container battletaskbox-container">
      <div className="box">
        <BattleTaskList className="battle-tasklist" todos={tasks} toggleComplete={toggleComplete} removeTask={removeTask} />
      </div>
    </div>
  );
};

export default BattleTaskBox;
