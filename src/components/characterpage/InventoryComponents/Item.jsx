import React, { useState, useEffect } from 'react'
import './Item.css'

import ranger_1 from '../../../assets/PlayerAvatars/ranger_1.png'
import ranger_2 from '../../../assets/PlayerAvatars/ranger_2.png'
import warrior_1 from '../../../assets/PlayerAvatars/warrior_1.png'
import warrior_2 from '../../../assets/PlayerAvatars/warrior_2.png'
import mage_1 from '../../../assets/PlayerAvatars/mage_1.png'
import mage_2 from '../../../assets/PlayerAvatars/mage_2.png'
import dino_1 from '../../../assets/PlayerAvatars/dino_1.png'
import dino_2 from '../../../assets/PlayerAvatars/dino_2.png'

const Item = ({title, is_equipped, is_Buy, equip_char_f}) => {

    const [equip, setEquipped] = useState(false);

    function imgBasedOnCharacter() {

        if (title === "ranger 1") {
            return ranger_1;
        }
        else if (title === "ranger 2") {
            return ranger_2;
        }
        else if(title === "warrior 1") {
            return warrior_1;
        }
        else if (title === "warrior 2") {
            return warrior_2;
        }
        else if (title === "wizard 1") {
            return mage_1;
        }
        else if (title === "wizard 2") {
            return mage_2;
        }
        else if (title === "dino 1") {
            return dino_1;
        }
        else if (title === "dino 2") {
            return dino_2;
        }
    }

    function handleClick(){
        let res = equip_char_f(title, is_equipped);
        setEquipped(res)
    }

    return (
        <div className="item-container">
            <button onClick={() => handleClick()} 
                    className= {(equip) ? 'btn item-body equip no-hover' : 'btn item-body'}
                    disabled = {equip}
            >
                <div >
                    <img src={imgBasedOnCharacter()} alt="" style={{filter: (is_Buy) ? "" : "grayscale(100%)"}}/>
                </div>
            </button>
        </div>
    )
}

export default Item