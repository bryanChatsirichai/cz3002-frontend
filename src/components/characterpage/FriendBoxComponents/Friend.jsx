import React from 'react';
import './Friend.css';
import profilepic from '../../../assets/player_profile_pic.png';

function Friend({ friend, toggleClaimed }) {
  function handleOnClickGift() {
    // Collect gift logic
    toggleClaimed(friend.id);
  }

  // return (
  //   <div className='friend-container'>
  //     <div className='profile-pic-border'>
  //       <img src={profilepic} alt="" />
  //     </div>
  //     <div className='profile-details'>
  //       <h4>{friend.name}</h4>
  //       <div className='profile-status'>
  //         <h5>{friend.id}</h5>
  //         <h5>{friend.name}</h5>
  //       </div>
  //     </div>
  //   </div>
  // )
  return (
    <div className="friend-container">
      <div className="profile-pic-border">
        <img src={profilepic} alt="" />
      </div>
      <div className="profile-details">
        <h4>{friend.name}</h4>
        <div className="profile-status"></div>
      </div>
    </div>
  );
}

export default React.memo(Friend);
