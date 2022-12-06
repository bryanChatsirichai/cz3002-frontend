import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import Stats from './Stats';
import UserName from './UserName';
import AxiosInterface from '../Misc/AxiosInterface';

const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();
const PLAYER_LOCAL_KEY = 'PLAYER_LOCAL_KEY';
const MAX_XP = 3000;

const UserProfile = () => {
  const [playerDetails, setPlayerState] = useState({
    name: '',
    xp: 0,
    // pwr: 0,
    gold: 0,
    // lvl: 0,
    // sp: 0
    //char_bought: [],
    //char_equipped: '',
    //BY default inside
    char_bought: ["warrior 1"],
    char_equipped: 'warrior_1',
  });
  //intial render
  useEffect(() => {
    console.log('render userProfile');
    getProfile();
  }, []);
  //re render only
  // useEffect(() => {
  //   );
  // }, [playerDetails]);

  //get profile related specific user
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
        const profile = profileArray[0];
        setPlayerState({ name: profile.name, xp: profile.xp, gold: profile.gold });
        //setTasks(profileArray);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  function computeLevel(xp) {
    return MAX_XP / xp;
  }

  return (
    <div className="userprofile-container">
      <UserName username={playerDetails.name}></UserName>
      <div className="stats-grp">
        <Stats statname="Xp:" value={playerDetails.xp}></Stats>
        {/* <Stats statname='Pwr:' value={playerDetails.pwr}></Stats> */}
        <Stats statname="Gold:" value={'$' + playerDetails.gold}></Stats>
        {/* <Stats statname='SP:' value={playerDetails.sp}></Stats> */}
      </div>
    </div>
  );
};

export default UserProfile;
