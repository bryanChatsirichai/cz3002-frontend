import React from 'react'
import './EnemyAvatar.css'
import damageEffect from '../../assets/effects/hit_effect_1.png'

function EnemyAvatar({ type, damaged, dead, damageTaken }) {
    var image = require(`../../assets/enemies/${type}.png`)

    function getDamageColor(l, m, h){
        if(damageTaken === l){
            return 'var(--color-light-yellow)'
        }
        else if(damageTaken === m){
            return 'var(--color-orange)'
        }
        else{
            return 'var(--color-reddish)'
        }
    }

    return (
        <div className='enemyavatar-container'>
            <div id={type} className="enemy"
                style={{
                    filter: dead ? "grayscale(1)" : "",
                }}
            >
                <img className={(damaged) ? "damaged" : ""}
                    src={image} alt=""
                    style={{
                        animationPlayState: dead ? "paused" : "",
                    }}
                />
            </div>
            <div className='vfx'>
                <img className={(damaged) ? "hit_effect damaged" : "hit_effect"} src={damageEffect} alt="" />
            </div>
            <div className= {damaged ? 'damageText' : ''}
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: damaged ? "1" : "0"
                }}
            >
                <h5 style={{
                    color: `${getDamageColor(5, 10, 20)}`,
                }}>
                    {damageTaken}
                </h5>
            </div>
        </div>
    )
}

export default EnemyAvatar