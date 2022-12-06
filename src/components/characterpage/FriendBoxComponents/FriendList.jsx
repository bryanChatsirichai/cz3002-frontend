import React from 'react'
import Friend from './Friend'
import './FriendList.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function FriendList({ friends, toggleClaimed }) {
  const [animationParent] = useAutoAnimate()

  return (
    <ul className='layout-scroll friend-layout' ref={animationParent}>
      {
        friends.map(friend => (<Friend
          key={friend.id}
          friend={friend}
          toggleClaimed={toggleClaimed}
        />
        )
        )
      }
    </ul>
  )
}

export default FriendList