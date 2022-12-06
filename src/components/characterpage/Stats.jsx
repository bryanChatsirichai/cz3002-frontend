import React from 'react'
import './Stats.css';

const Stats = ({statname, value}) => {
  return (
    <div className='stat'>
        <h3 className='stat-name'>{statname}</h3>
        <h3 className='stat-value'>{value}</h3>
    </div>
  )
}

export default Stats