import React, { useEffect, useState, useRef } from 'react';
import './VictoryBox.css';
import useIntersecion from '../Misc/useIntersecion';
import AxiosInterface from '../Misc/AxiosInterface';

const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();
// const PLAYER_LOCAL_KEY = 'PLAYER_LOCAL_KEY';

function VictoryBox({ xp, gold }) {
  const ref = useRef();
  const inViewport = useIntersecion(ref, '0px');

  const [playerStored, updatePlayerStored] = useState({
    name: '',
    xp: 0,
    // pwr: 0,
    gold: 0,
    // lvl: 0,
    // sp: 0
  });
  useEffect(() => {
    //console.log('first render');
    getProfile();
  }, []);

  useEffect(() => {
    console.log('reRender', playerStored);
    updatePlayer();
  }, [playerStored]);

  async function updatePlayer() {
    //console.log('update player');
    let n_xp = updateValue(playerStored.xp, xp);
    let n_gold = updateValue(playerStored.gold, gold);
    await updateProfile({ xp: n_xp, gold: n_gold });
  }

  function updateValue(value1, value2) {
    // console.log('old', value1);
    // console.log('new', value2);
    return value1 + value2;
  }

  //update in DB
  const updateProfile = async (update) => {
    let headers = {
      auth_token: AUTH_TOKEN,
    };
    try {
      await axiosInterface.patchData('/home/profile', '', update, headers);
    } catch (error) {
      console.log(error);
    }
  };

  //get from DB
  const getProfile = async () => {
    //not null key exist in local storage
    if (AUTH_TOKEN) {
      let headers = {
        auth_token: AUTH_TOKEN,
      };
      try {
        let response = await axiosInterface.getData('/home/profile', headers);
        // profile associated to specific user
        const profileArray = response.data;
        // console.log(tasksArray);
        if (profileArray.length === 0) {
          //nothing to render
          console.log('No Profile');
          return;
        }
        //mongo always return an array
        //console.log('retrived profile');
        const profile = profileArray[0];
        console.log({ name: profile.name, xp: profile.xp, gold: profile.gold });
        //console.log('end');

        //only reflected on next reRender
        updatePlayerStored({ name: profile.name, xp: profile.xp, gold: profile.gold });
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };
  useEffect(() => {
    if (inViewport) {
      //console.log('inViewport');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewport]);

  return (
    <div className="victorybox-container" ref={ref}>
      <div className="box">
        <h2>CONGRATULATIONS!!</h2>

        <div className="fields">
          <div>
            <span className="outer-field">EXP: </span> <span className="inner-field">{xp}xp</span>
          </div>
          <div>
            <span className="outer-field"> GOLD:</span>
            <span className="inner-field">${gold} </span>
          </div>
        </div>

        {/* <h3>items</h3> */}
        <a className="btn" href="profile">
          <h5>BACK</h5>
        </a>
      </div>
    </div>
  );
}

export default VictoryBox;
