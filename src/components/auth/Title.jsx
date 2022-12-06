import React from 'react'
import './Title.css'
import title from '../../assets/Title.png'
import char from '../../assets/player_idle_sprite_sheet.png'
import sword from '../../assets/player_sword.png'
const Title = () => {
    return (
        <div className='titlescreen-container'>
            <div className='background'>
                <div className='main-title'>
                    <img src={title} alt="" />
                </div>
                <div className='titlescreen-body'>
                    <div className='char-text-box'>
                        <a href="login" className='box btn title-screen-btn'>
                            <div className='box-content'>
                                <h5>Begin Your</h5>
                                <h4>Adventure</h4>
                            </div>
                        </a>
                    </div>
                    <div className='auth-character-avatar'>
                        <div className="player">
                            <div id="warrior_weapon_1" className='player_weapon'>
                                <img className="player_sword" src={sword} alt="" />
                            </div>
                            <div className="player-avatar">
                                <img className="player_spritesheet" src={char} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Title