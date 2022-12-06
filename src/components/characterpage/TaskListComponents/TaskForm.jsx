import React, { useState } from 'react';
import Select from 'react-select';
import AxiosInterface from '../../Misc/AxiosInterface';
// import Select from 'react-select' // might want to look into this for future ref
import './TaskForm.css';
import { v4 as uuidv4 } from 'uuid';
const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();

const options = [
  { value: 'High', label: 'High' },
  { value: 'Med', label: 'Med' },
  { value: 'Low', label: 'Low' },
];
function TaskForm({ addTask }) {
  const [todo, setTask] = useState({
    id: '',
    task: '',
    completed: false,
    priority: 'High',
  });

  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setTask({ ...todo, task: e.target.value });
  }

  function handleTaskPriorityChange(selectedOption) {
    setTask({ ...todo, priority: selectedOption.value });
  }
  async function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (todo.task.trim()) {
      //ADD TO DB

      //task to be added to DB
      const task_id = uuidv4();
      const taskFields = { task: todo.task, id: task_id, priority: todo.priority };

      //set the auth token
      let headers = {
        auth_token: AUTH_TOKEN,
      };
      //console.log(headers);
      try {
        //saving to DB
        let response = await axiosInterface.postData('/home/task', taskFields, headers);
        //console.log('response', response);

        //refresh the task menue
        //console.log(headers);
        response = await axiosInterface.getData('/home/task', headers);
        //console.log(response.data);

        const tasksArray = response.data;
        const latestEntry = tasksArray[tasksArray.length - 1];
        //console.log(latestEntry);

        addTask({ ...latestEntry, id: task_id });
        //console.log('arr', tasksArray);
      } catch (error) {
        //Fail case need be handle
        console.log(error);
      }

      //original
      //addTask({ ...todo, id: task_id });

      //reset task input
      setTask({ ...todo, task: '' });
    }
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid var(--color-darkish-blue)',
      color: state.isSelected ? 'var(--color-reddish)' : 'var(--color-darkish-blue)',
      backgroundColor: state.isFocused ? 'rgba(0,0,0,0.1)' : '',
      fontFamily: 'var(--alt-font)',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      fontFamily: 'var(--alt-font)',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'var(--color-btn-bg)',
      backgroundColor: state.isFocused ? 'rgba(0,0,0,0.1)' : '',
    }),
    container: (provided, state) => ({
      ...provided,
      border: '1px solid var(--color-btn-bg)',
      borderRadius: '5px',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <div className="taskform-container">
      <form action="" onSubmit={handleSubmit} className="taskform-format">
        <input name="task" type="text" onChange={handleTaskInputChange} value={todo.task} />
        <Select
          className="taskpriority-select"
          options={options}
          onChange={handleTaskPriorityChange}
          styles={customStyles}
          placeholder={'Select your priority...'}
        />
        <button className="btn" type="submit">
          <h5>+</h5>
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
