import React from 'react';
import './Register.css';
import AxiosInterface from '../Misc/AxiosInterface';
import { Form, Field } from 'react-final-form';
import PlayerAvatar from '../PlayerAvatar';
import char from '../../assets/player_idle_sprite_sheet.png'
import sword from '../../assets/player_sword.png'
import PopUp from './Popup';
import { useState } from 'react';

const axiosInterface = new AxiosInterface();

const Register = () => {
  var [popupError,showError] = useState(undefined);

  async function onBtnClick(values) {
    //TODO: backend logic
    console.log('values', values);
    const userFields = {
      name: values.username,
      email: values.email,
      region: values.region,
      password: values.password,
    };
    try {
      const response = await axiosInterface.postData('/user/register', userFields);
      const auth_token = response.headers.auth_token;
      localStorage.setItem('auth_token', auth_token);
      window.location.href = 'profile';
    } catch (error) {
      if (error.message === 'Network Error')
        showError('Backend connection error')
      switch (error.response.data.message) {
        case 'Email already exist':
          showError('Please use another email')
          break
        case '"region" is required':
          showError('Please select a region')
          break
        default:
          showError(error.response.data.message)
          break
      }
    }
  }

  return (
    <div className="register-background">
      {popupError ? <PopUp toggle={() => showError(undefined)} errorMsg={popupError}/> : 
      <div className="box">
        <h3>Character Sheet</h3>
        <Form
          onSubmit={onBtnClick}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className="authform">
              <div>
                <Field name="username" validate={(value) => (value ? (value.match(/^[a-zA-Z]+$/) ? undefined : 'Only letters allowed') : 'Required')}>
                  {({ input, meta }) => (
                    <div>
                      <label>Name </label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span style={{ color: 'red' }}>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="age" validate={(value) => (value ? (value < 1 || value > 200 ? 'Invalid' : undefined) : 'Required')}>
                  {({ input, meta }) => (
                    <div>
                      <label>Age </label>
                      <input {...input} type="number" />
                      {meta.error && meta.touched && <span style={{ color: 'red' }}>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="email"
                  validate={(value) =>
                    value
                      ? value.lastIndexOf('@') > 2 &&
                        value.lastIndexOf('@') < value.lastIndexOf('.') &&
                        value.lastIndexOf('.') > 2 &&
                        value.length - value.lastIndexOf('.') > 2
                        ? undefined
                        : 'Invalid'
                      : 'Required'
                  }
                >
                  {({ input, meta }) => (
                    <div>
                      <label>Email</label>
                      <input {...input} type="text" />
                      {meta.error && meta.touched && <span style={{ color: 'red' }}>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div>
                  <label>Region</label>
                  <Field name="region" component="select" validate={value => value === '' ? 'Please select' : undefined}>
                    <option value=""></option>
                    <option value="SEA">SEA</option>
                    <option value="US">US</option>
                    <option value="EU">EU</option>{' '}
                    {({ input, meta }) => (
                      <div>
                        {!meta.touched && <span style={{ color: 'red' }}>{meta.error}</span>}
                      </div>
                    )}
                  </Field>{' '}
                  <Field
                    name="password"
                    validate={(value) => (value ? (value.length < 8 ? 'Must be at least 8 characters long' : undefined) : 'Required')}
                  >
                    {({ input, meta }) => (
                      <div>
                        <label>Password</label>
                        <input {...input} type="password" />
                        {meta.error && meta.touched && <span style={{ color: 'red' }}>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                </div>
                <br />
                <div className="auth-btn-group">
                  <button type="submit" className="btn" disabled={submitting}>
                    <h5>Register</h5>
                  </button>
                  <button className="btn" onClick={(v) => (window.location.href = 'login')}>
                    <h5>Login Instead</h5>
                  </button>
                  {/* <button type="submit" className="btn" disabled={submitting}>
                    <h5>Done</h5>
                  </button> */}
                </div>
              </div>
            </form>
          )}
        />
      </div>
      }
      <div className="auth-character-avatar">
        <div className="player">
          <div id="warrior_weapon_1" className='player_weapon'>
            <img className="player_sword" src={sword} alt="" />
          </div>          
          <div className="player-avatar">
            <img className="player_spritesheet" src={char} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
