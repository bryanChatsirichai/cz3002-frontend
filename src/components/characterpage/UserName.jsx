import React from 'react'
import './UserName.css'
const UserName = ({username}) => {
  return (
    <h2 className='user-name'>{username}</h2>
  )
}

export default UserName