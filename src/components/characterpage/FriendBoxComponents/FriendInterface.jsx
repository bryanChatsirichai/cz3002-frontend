import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './FriendInterface.css';
import AxiosInterface from '../../Misc/AxiosInterface';

const LOCAL_FRIEND_SYSTEM = 'TEST_FRIEND_SYSTEM';

// Get list of available users in the system
// Check if the username keyed in exist
// need to save the image of the player and display

const AUTH_TOKEN = localStorage.getItem('auth_token');
const axiosInterface = new AxiosInterface();
let input_value = '';

function FriendInterface({ addFriend }) {
  const [friend, setFriend] = useState({
    id: '',
    name: '',
    added: false,
    profile_pic: 0,
  });

  //////////////////////////////////////////////// TESTING ////////////////////////////////////////////////////////////////
  const [testFriendInSystem, setFriendInSystem] = useState([]);

  useEffect(() => {
    const friendInSystem = JSON.parse(localStorage.getItem(LOCAL_FRIEND_SYSTEM));
    if (friendInSystem) {
      setFriendInSystem(friendInSystem);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_FRIEND_SYSTEM, JSON.stringify(testFriendInSystem));
  }, [testFriendInSystem]);

  function addALL() {
    addFriendToystemList('Thomas');
  }
  function addFriendInSystem(friend) {
    setFriendInSystem([...testFriendInSystem, friend]);
  }
  function addFriendToystemList(friendName) {
    // get list of accounts and check against input
    addFriendInSystem({ ...friend, id: uuidv4(), name: friendName });
  }
  //////////////////////////////////////////////// TESTING ////////////////////////////////////////////////////////////////

  function addFriendToList(friendName) {
    // get list of accounts and check against input
    if (friendName !== '') {
      addFriend({ ...friend, id: uuidv4(), name: friendName, added: true, profile_pic: 1 });
      setFriend({ ...friend, name: '' });
    }
  }

  // For testing only
  async function handleAddFriend(e) {
    e.preventDefault(); // prevents browser refresh
    //console.log('Add friend btn press');
    await addFriendIfExists(input_value, testFriendInSystem);
  }

  async function addFriendIfExists(name, list) {
    console.log('Inputed friend name', name);
    if (AUTH_TOKEN) {
      let headers = {
        auth_token: AUTH_TOKEN,
      };
      await axiosInterface.postData('/home/users/addFriend', { friend: name }, headers);
      setFriendInSystem(
        list.map((friend) => {
          if (friend.name === name && friend.added === false) {
            // add to personal list
            addFriendToList(name);

            // update DB on added
            return {
              ...friend,
              added: true,
            };
          }
          return friend;
        })
      );
    }
  }

  function handleFriendInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    input_value = e.target.value;
  }

  function ClearLocalStorage() {
    localStorage.clear();
  }

  return (
    <div className="friendinterface-container">
      {/* <button className='btn' onClick={addALL}></button>
      <button className='btn' onClick={ClearLocalStorage}>Clear</button> */}
      <form action="" onSubmit={handleAddFriend}>
        <input type="text" onChange={handleFriendInputChange} />
      </form>
      <button className="btn" onClick={handleAddFriend}>
        Add
      </button>
    </div>
  );
}

export default FriendInterface;
