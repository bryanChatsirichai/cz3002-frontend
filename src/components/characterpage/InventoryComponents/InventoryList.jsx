import React, { useState, useEffect } from 'react';
import './InventoryList.css';
import Item from './Item';
import AxiosInterface from '../../Misc/AxiosInterface';

const PLAYER_LOCAL_KEY = 'PLAYER_LOCAL_KEY';
const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();

const charTitleList = [
  { title: 'ranger 1' },
  { title: 'ranger 2' },
  { title: 'warrior 1' },
  { title: 'warrior 2' },
  { title: 'wizard 1' },
  { title: 'wizard 2' },
  { title: 'dino 1' },
  { title: 'dino 2' },
];

function InventoryList({ items, toggleEquipped }) {
  // Player Details
  const [playerDetails, setPlayerState] = useState({
    name: '',
    xp: 0,
    gold: 0,
    char_bought: [],
    char_equipped: '',
  });

  // useEffect(() => {
  //     const player_stats = JSON.parse(localStorage.getItem(PLAYER_LOCAL_KEY));
  //     if (player_stats && player_stats.name !== "") {
  //         setPlayerState(player_stats);
  //     }
  // }, [])

  // useEffect(() => {
  //     localStorage.setItem(PLAYER_LOCAL_KEY, JSON.stringify(playerDetails))
  // }, [playerDetails]);

  //initial render
  useEffect(() => {
    console.log('render Inventory');
    getProfile();
  }, []);

  //re render
  useEffect(() => {
    console.log("reRender",playerDetails);
    //localStorage.setItem(PLAYER_LOCAL_KEY, JSON.stringify(playerDetails))
  }, [playerDetails]);

  function charHasBeenBought(char_bought, title) {
    if (char_bought.includes(title) === true) {
      return true;
    }
    return false;
  }

  function updatePlayer(title) {
    let n_char_equipped = updateCharEquip(title);

    //update equip char in DB
    updateCharEquipProfile({ char_equipped: n_char_equipped });
    setPlayerState({
      ...playerDetails,
      char_equipped: n_char_equipped,
    });
  }

  function updateCharEquip(title) {
    return title;
  }

  function equip_char(title, is_equipped) {
    if (playerDetails.char_bought.includes(title) === true) {
      updatePlayer(title);
      return true;
    }
    return false;
  }

  //Bryan code
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
        setPlayerState(profile);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  const updateCharEquipProfile = async (update) => {
    let headers = {
      auth_token: AUTH_TOKEN,
    };
    try {
      await axiosInterface.patchData('/home/profile/equipChar', '', update, headers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="layout-scroll inventory-layout">
      <Item
        title={charTitleList[0].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[0].title)}
        equip_char_f={equip_char}
      ></Item>

      <Item
        title={charTitleList[1].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[1].title)}
        equip_char_f={equip_char}
      ></Item>

      <Item
        title={charTitleList[2].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[2].title)}
        equip_char_f={equip_char}
      ></Item>

      <Item
        title={charTitleList[3].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[3].title)}
        equip_char_f={equip_char}
      ></Item>

      <Item
        title={charTitleList[4].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[4].title)}
        equip_char_f={equip_char}
      ></Item>

      <Item
        title={charTitleList[5].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[5].title)}
        equip_char_f={equip_char}
      ></Item>

      <Item
        title={charTitleList[6].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[6].title)}
        equip_char_f={equip_char}
      ></Item>

      <Item
        title={charTitleList[7].title}
        is_Buy={charHasBeenBought(playerDetails.char_bought, charTitleList[7].title)}
        equip_char_f={equip_char}
      ></Item>
    </ul>
  );
}

export default InventoryList;
