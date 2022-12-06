import React, { useState } from 'react'
import Healthbar from './Healthbar'
import PlayerAvatar from '../PlayerAvatar';
import './Player.css'

function Player({ health, maxhealth, name, taskcomplete }) {
    const [hp, setHP] = useState(health);

    function hpSetter(value) {
        setHP(value);
    }

    return (
        <div className='player-container'>
            <div className='entity-container'>
                <h5>{name}</h5>
                {/* <Healthbar currHealth={hp} health={maxhealth} hpSetter={hpSetter} /> */}
                <PlayerAvatar taskcomplete={taskcomplete}/>
            </div>
        </div>
    )
}

export default Player