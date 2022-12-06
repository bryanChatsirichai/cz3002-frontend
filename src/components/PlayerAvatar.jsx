import React, { useState, useEffect } from 'react';
import './PlayerAvatar.css';

// idle assets
import ranger_1_idle from '../assets/PlayerAvatarIdle/ranger_1_idle_sprite_sheet.png';
import ranger_2_idle from '../assets/PlayerAvatarIdle/ranger_2_idle_sprite_sheet.png';
import warrior_1_idle from '../assets/player_idle_sprite_sheet.png';
import warrior_2_idle from '../assets/PlayerAvatarIdle/warrior_2_idle_sprite_sheet.png';
import mage_1_idle from '../assets/PlayerAvatarIdle/mage_1_idle_sprite_sheet.png';
import mage_2_idle from '../assets/PlayerAvatarIdle/mage_2_idle_sprite_sheet.png';
import dino_1_idle from '../assets/PlayerAvatarIdle/dino_1_idle_sprite_sheet.png';
import dino_2_idle from '../assets/PlayerAvatarIdle/dino_2_idle_sprite_sheet.png';

//weapon assets
import ranger_weapon from '../assets/PlayerWeapons/ranger_bow.png';
import warrior_1_weapon from '../assets/player_sword.png';
import warrior_2_weapon from '../assets/PlayerWeapons/warrior_2_sword.png';
import mage_1_weapon from '../assets/PlayerWeapons/mage_1_staff.png';
import mage_2_weapon from '../assets/PlayerWeapons/mage_2_staff.png';
import dino_1_weapon from '../assets/PlayerWeapons/dino_1_club.png';
import dino_2_weapon from '../assets/PlayerWeapons/dino_2_club.png';

import AxiosInterface from './Misc/AxiosInterface';

const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();
const PLAYER_LOCAL_KEY = 'PLAYER_LOCAL_KEY';

/*
BAD IMPLEMENTATION AS CONSTANLY REFRSHING WHEN CHANGING CHARACTER
USE EFFECT WILL NOT TRIGGER NOT PERSISTENT AS SAPERATE.
Periodically refresh this page stealthly
*/
let player_weapon ="";
let player_sprite ="";

const PlayerAvatar = ({ taskcomplete }) => {
  const [playerAttack, setPlayerAttackAnim] = useState(false);
  //   const [avatarSrc, setAvatarSrc] = useState('');
  //   const [weaponSrc, setWeaponSrc] = useState('');
  const [characterSrc, setCharacter] = useState({ charSrc: '', weaponSrc: '' });

  useEffect(() => {
    //console.log('First render playerAvatar');
    //charAndWeapon();
    //charImgBasedOnCharacter();
    //weaponImgBasedOnCharacter();
    const t = setInterval(charAndWeapon, 1500);
    return () => {
      //console.log('clean up1');
      clearInterval(t);
    }; // clear
  }, [characterSrc]);
  //   useEffect(() => {
  //     console.log('Rerender playerAvatar');
  //     //charAndWeapon();
  //     //charImgBasedOnCharacter();
  //     //weaponImgBasedOnCharacter();
  //   }, [characterSrc]);

  const charAndWeapon = async () => {
    let char = '';
    let weapon = '';
    const profile = await getProfile();
    let title = profile.char_equipped[0];
    //console.log('cur char', title);
    if (title === 'ranger 1') {
      char = ranger_1_idle;
      player_sprite = "ranger_1"
      //setAvatarSrc(ranger_1_idle);
      //return ranger_1_idle;
    } else if (title === 'ranger 2') {
      char = ranger_2_idle;
      player_sprite = "ranger_2"
      //setAvatarSrc(ranger_2_idle);
      //return ranger_2_idle;
    } else if (title === 'warrior 1') {
      char = warrior_1_idle;
      player_sprite = "warrior_1"
      //setAvatarSrc(warrior_1_idle);
      //return warrior_1_idle;
    } else if (title === 'warrior 2') {
      char = warrior_2_idle;
      player_sprite = "warrior_2"
      //setAvatarSrc(warrior_2_idle);
      //return warrior_2_idle;
    } else if (title === 'wizard 1') {
      char = mage_1_idle;
      player_sprite = "wizard_1"
      //setAvatarSrc(mage_1_idle);
      //return mage_1_idle;
    } else if (title === 'wizard 2') {
      char = mage_2_idle;
      player_sprite = "wizard_2"
      //setAvatarSrc(mage_2_idle);
      //return mage_2_idle;
    } else if (title === 'dino 1') {
      char = dino_1_idle;
      player_sprite = "dino_1"
      //setAvatarSrc(dino_1_idle);
      //return dino_1_idle;
    } else if (title === 'dino 2') {
      char = dino_2_idle;
      player_sprite = "dino_2"
      //setAvatarSrc(dino_2_idle);
      //return dino_2_idle;
    }
    if (title === 'ranger 1' || title === 'ranger 2') {
      weapon = ranger_weapon;
      player_weapon="ranger_weapon"
      //setWeaponSrc(ranger_weapon);
      //return ranger_weapon;
    } else if (title === 'warrior 1') {
      weapon = warrior_1_weapon;
      player_weapon="warrior_weapon_1"
      //setWeaponSrc(warrior_1_weapon);
      //return warrior_1_weapon;
    } else if (title === 'warrior 2') {
      weapon = warrior_2_weapon;
      player_weapon="warrior_weapon_2"
      //setWeaponSrc(warrior_2_weapon);
      //return warrior_2_weapon;
    } else if (title === 'wizard 1') {
      weapon = mage_1_weapon;
      player_weapon ="mage_weapon_1"
      //setWeaponSrc(mage_1_weapon);
      //return mage_1_weapon;
    } else if (title === 'wizard 2') {
      weapon = mage_2_weapon;
      player_weapon="mage_weapon_2"
      //setWeaponSrc(mage_2_weapon);
      //return mage_2_weapon;
    } else if (title === 'dino 1') {
      weapon = dino_1_weapon;
      player_weapon ="dino_weapon_1"
      //setWeaponSrc(dino_1_weapon);
      //return dino_1_weapon;
    } else if (title === 'dino 2') {
      weapon = dino_2_weapon;
      player_weapon ="dino_weapon_2"
      //setWeaponSrc(dino_2_weapon);
      //return dino_2_weapon;
    }
    setCharacter({ weaponSrc: weapon, charSrc: char });
  };

  useEffect(() => {
    if (taskcomplete) {
      setPlayerAttackAnim(true);
      setTimeout(() => {
        setPlayerAttackAnim(false);
      }, 300);
    }
  }, [taskcomplete]);

  //bryan code
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
        return profile;
        //return profile.char_equipped;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };
  //WORKS BUT BAD IMPLEMENTATION
  //charImgBasedOnCharacter();
  //weaponImgBasedOnCharacter();
  //charAndWeapon();
  return (
    <div
      className="player"
      style={{
        animationPlayState: playerAttack ? 'running' : 'paused',
      }}
    >
      <div id={player_weapon} className='player_weapon'>
        <img className="player_sword" src={characterSrc.weaponSrc} alt="" />
      </div>
      <div id={player_sprite} className="player-avatar">
        <img className="player_spritesheet" src={characterSrc.charSrc} alt="" />
      </div>
    </div>
  );
};

export default PlayerAvatar;
