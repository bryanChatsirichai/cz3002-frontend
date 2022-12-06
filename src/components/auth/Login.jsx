import React from 'react';
import './Login.css';
import { Form, Field } from 'react-final-form';
import AxiosInterface from '../Misc/AxiosInterface';
import char from '../../assets/player_idle_sprite_sheet.png'
import sword from '../../assets/player_sword.png'
import PopUp from './Popup';
import { useState } from 'react';
const axiosInterface = new AxiosInterface();

const Login = () => {
  function registerBtnClick(e) {
    window.location.href = 'register';
  }
  
  var [popupError,showError] = useState(undefined);

  async function loginBtnClick(values) {
    const userFields = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axiosInterface.postData('/user/login', userFields);
      const auth_token = response.headers.auth_token;
      localStorage.setItem('auth_token', auth_token);
      window.location.href = 'profile';
      //console.log(auth_token);
    } catch (error) {
      if (error.message === 'Network Error')
        showError('Backend connection error')
      switch (error.response.data.message) {
        case 'Email does not exist':
        case 'Invalid Password':
        case '"password" length must be at least 5 characters long':
          showError("Incorrect username or password")
          break
        case '"email" must be a valid email':
          showError("Please enter a valid email")
          break
        default:
          showError(error.response.data.message)
          break
      }
    }
  }

  return (
    <div className='login-background'>
      {popupError ? <PopUp toggle={() => showError(undefined)} errorMsg={popupError}/> : 
      <div className='box'>
        <div className='login-title'>
          {/* <h3>Hello, Adventurer</h3> */}
          <span style={{ "--i": 1 }}>H</span>
          <span style={{ "--i": 2 }}>e</span>
          <span style={{ "--i": 3 }}>l</span>
          <span style={{ "--i": 4 }}>l</span>
          <span style={{ "--i": 5 }}>o</span>
          <span style={{ "--i": 6 }}>,</span>
          <span style={{ "--i": 7 }}>A</span>
          <span style={{ "--i": 8 }}>d</span>
          <span style={{ "--i": 9 }}>v</span>
          <span style={{ "--i": 10 }}>e</span>
          <span style={{ "--i": 11 }}>n</span>
          <span style={{ "--i": 12 }}>t</span>
          <span style={{ "--i": 13 }}>u</span>
          <span style={{ "--i": 14 }}>r</span>
          <span style={{ "--i": 15 }}>e</span>
          <span style={{ "--i": 16 }}>r</span>
        </div>
        <Form
          onSubmit={loginBtnClick}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className="authform login-form">
              <div>
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
                <Field name="password" validate={(value) => (value ? undefined : 'Required')}>
                  {({ input, meta }) => (
                    <div>
                      <label>Password</label>
                      <input {...input} type="password" />
                      {meta.error && meta.touched && <span style={{ color: 'red' }}>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className='auth-btn-group'>
                <button type="submit" className="btn" disabled={submitting}>
                  <h5>Login</h5>
                </button>
                <button className="btn" onClick={registerBtnClick}>
                  <h5>New Account</h5>
                </button>
              </div>

            </form>
          )}
        />

      </div>
      }
      <div className="auth-character-avatar">
        {/* <PlayerAvatar /> */}
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

export default Login;
