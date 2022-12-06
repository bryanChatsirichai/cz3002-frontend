import React, { useState, useEffect } from 'react'
// import './Enemy.css'
import Healthbar from './Healthbar'
import EnemyAvatar from './EnemyAvatar';

function Enemy({ currHealth, health, name, type, dead, damageTaken }) {
  const [damaged, setDamaged] = useState(false);
  
  function hpSetter(value) {
    // damage taken
    setDamaged(true);
    setTimeout(() => {
      setDamaged(false);
    }, 200);
    currHealth = value;
  }

  useEffect(() => {
    if(currHealth !== health){
      hpSetter(currHealth);
    }
  }, [currHealth])

  return (
    <div className='enemy-container'>
      <div className='entity-container'>
        <h5>{name}</h5>
        <Healthbar currHealth={currHealth} health={health} hpSetter={hpSetter} />
        <EnemyAvatar type={type} damaged={damaged} dead={dead} damageTaken={damageTaken}/>
      </div>
    </div>
  )
}

export default Enemy