import React, { useState } from 'react';
import './CharacterPage.css';

// REACT COMPONENTS //
import UserProfile from './UserProfile';
import FriendBox from './FriendBoxComponents/FriendBox';
import Shop from './ShopComponents/Shop';
import InventoryBox from './InventoryComponents/InventoryBox';
import TaskBox from './TaskListComponents/TaskBox';
import PlayerAvatar from '../PlayerAvatar';
import RecommendedTaskBox from './RecommendedTaskComponents/RecommendedTaskBox';

// ICONS OR IMAGES//
import player_profile_pic from '../../assets/player_profile_pic.png';
import ranger_1 from '../../assets/profile_pics/ranger_1.png';
import ranger_2 from '../../assets/profile_pics/ranger_2.png';
import warrior_1 from '../../assets/player_profile_pic.png';
import warrior_2 from '../../assets/profile_pics/warrior_2.png';
import mage_1 from '../../assets/profile_pics/mage_1.png';
import mage_2 from '../../assets/profile_pics/mage_2.png';
import dino_1 from '../../assets/profile_pics/dino_1.png';
import dino_2 from '../../assets/profile_pics/dino_2.png';

import messageicon from '../../assets/icons/Messages.png';
import favouritesicon from '../../assets/icons/Favorites.png';
import protectionicon from '../../assets/icons/Protection.png';
import chestbtn from '../../assets/Chest.png';
import tridot from '../../assets/icons/Kebab_Menu_Horizontal.png';
import pointerdownicon from '../../assets/icons/Pointer_Down.png';
import personicon from '../../assets/icons/Person.png';
import minusicon from '../../assets/icons/Minus.png';
import homeicon from '../../assets/icons/Home.png';
import recommendedtaskicon from '../../assets/icons/Copy_Document.png';

import AxiosInterface from '../Misc/AxiosInterface';
import { useEffect } from 'react';
const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();

const charPageScreens = [
  { key: 1, screen: <TaskBox /> },
  { key: 2, screen: <FriendBox /> },
  { key: 3, screen: <InventoryBox /> },
  { key: 4, screen: <RecommendedTaskBox /> },
];

const CharacterPage = () => {
  const [screen, setScreen] = useState('');

  //CONTROL PFORILE ICON//
  const [profileIconSrc, setProfileIcon] = useState(warrior_1); //default

  /* HOOKS */
  const [showSideBar, setShowSideBar] = useState(false);
  const [hideLowerBtn, setHideLowerBtn] = useState(false);

  function handleChangeScreen(obj, hideLower) {
    if (screen.key === obj.key) {
      setScreen('');
      if (hideLower) {
        collapseLowerBtn(false);
      }
    } else {
      setScreen(obj);
      if (hideLower) {
        collapseLowerBtn(true);
      }
    }
  }

  const handleSideBar = (event) => {
    setShowSideBar((current) => !current);
  };

  const collapseLowerBtn = (status) => {
    setHideLowerBtn(status);
    setShowSideBar(false);
  };

  // Character Profile Picture Change Function
  //Bryan code
  useEffect(() => {
    //console.log('update icon');
    const t = setInterval(updateProdileIcon, 700);
    return () => {
      //console.log('clean up2');
      clearInterval(t);
    };
  }, [profileIconSrc]);
  // useEffect(() => {
  //   console.log('rerender update icon');
  //   //const t = setInterval(updateProdileIcon, 1500);
  //   //return () => clearInterval(t);
  // }, [profileIconSrc]);

  const updateProdileIcon = async () => {
    //char_equipped
    let title = '';
    const profile = await getProfile();
    title = profile.char_equipped[0];

    if (title === 'ranger 1') {
      title = ranger_1;
      //return ranger_1;
    } else if (title === 'ranger 2') {
      title = ranger_2;
      //return ranger_2;
    } else if (title === 'warrior 1') {
      title = warrior_1;
      //return warrior_1;
    } else if (title === 'warrior 2') {
      title = warrior_2;
      //return warrior_2;
    } else if (title === 'wizard 1') {
      title = mage_1;
      //return mage_1;
    } else if (title === 'wizard 2') {
      title = mage_2;
      //return mage_2;
    } else if (title === 'dino 1') {
      title = dino_1;
      //return dino_1;
    } else if (title === 'dino 2') {
      title = dino_2;
      //return dino_2;
    }
    setProfileIcon(title);
  };

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

  /* ================ RENDER ==================== */
  return (
    <div className="characterpage_container">
      <div className="background">
        {/* CHARACTER PROFILE IN THE TOP LEFT*/}
        <div className="character_profile">
          {/* Profile picture*/}
          <div className="profile-picture">
            <div className="profile-pic-border">
              <img src={profileIconSrc} alt="" />
            </div>
            <div className="line"></div>
          </div>

          {/* Profile details*/}
          <div className="char-details">
            <UserProfile />
          </div>
        </div>

        {/* TOP RIGHT BUTTONS:
              1. message box
              2. gift box
              3. favourites
          */}
        <div className="btn_group">
          <button onClick={() => handleChangeScreen(charPageScreens[0], true)} className="btn message-btn">
            <img src={messageicon} alt="" />
          </button>
          <button onClick={() => handleChangeScreen(charPageScreens[1], true)} className="btn friends-btn">
            <img src={personicon} alt="" />
          </button>
          <a href="shop" className="btn fav-btn">
            <img src={favouritesicon} alt="" />
          </a>
          {/* <button onClick={() => handleChangeScreen(charPageScreens[2], true)} className="btn fav-btn"><img src={favouritesicon} alt="" /></button> */}
        </div>

        {/* PLAYER AVATAR */}
        <div className="avatar-scene">
          <div className="character-avatar">
            <PlayerAvatar />
          </div>
        </div>

        {/* BOTTOM BUTTON:
              1. inventory
              2. battle
              3. sidebar
          */}
        <div className="bottom_btn" style={{ transform: hideLowerBtn ? 'translateY(120%)' : 'translateY(0)' }}>
          <button onClick={() => handleChangeScreen(charPageScreens[2], false)} className="btn inventory-btn">
            <img src={chestbtn} alt="" />
          </button>
          <a href="battle" className="btn battle-btn">
            <img src={protectionicon} alt="" />
          </a>
          <div className="sidebar-container">
            <button
              onClick={handleSideBar}
              className={showSideBar ? 'btn sidebar-btn no-hover' : 'btn sidebar-btn'}
              disabled={showSideBar}
              style={{
                transform: showSideBar ? 'translateY(-65%)' : 'translateY(5%)',
                backgroundColor: showSideBar ? 'var(--color-darkish-blue)' : '',
                border: showSideBar ? '0 transparent' : '',
              }}
            >
              <img src={tridot} style={{ display: showSideBar ? 'none' : 'block' }} alt="" />
              {/* Inner buttons inside the side bar */}
              <div className="inner-btns">
                <a href="login" className="btn">
                  <img src={homeicon} alt="" />
                </a>
                <button className="btn" onClick={() => handleChangeScreen(charPageScreens[3], false)}>
                  <img src={recommendedtaskicon} alt="" />
                </button>
                <img src={minusicon} style={{ marginTop: '14vh' }} alt="" />
                <button className="btn" onClick={handleSideBar}>
                  <img src={pointerdownicon} alt="" />
                </button>
              </div>
            </button>
          </div>
        </div>

        {/* VARIOUS BUTTON SCREENS */}
        <div>{screen.screen}</div>
      </div>
    </div>
  );
};

export default CharacterPage;
