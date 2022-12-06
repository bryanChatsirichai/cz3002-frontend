import React, {useState, useEffect} from 'react'
import './ShopItem.css'

import ranger_1 from '../../../assets/PlayerAvatars/ranger_1.png'
import ranger_2 from '../../../assets/PlayerAvatars/ranger_2.png'
import warrior_2 from '../../../assets/PlayerAvatars/warrior_2.png'
import mage_1 from '../../../assets/PlayerAvatars/mage_1.png'
import mage_2 from '../../../assets/PlayerAvatars/mage_2.png'
import dino_1 from '../../../assets/PlayerAvatars/dino_1.png'
import dino_2 from '../../../assets/PlayerAvatars/dino_2.png'


const PLAYER_LOCAL_KEY = "PLAYER_LOCAL_KEY";

const ShopItem = ({title, cost, is_Buy, buy_f}) => {
    
    const [bought, setBought] = useState(false);

    // Player Details

    function imgBasedOnCharacter() {

        if (title === "ranger 1") {
            return ranger_1;
        }
        else if (title === "ranger 2") {
            return ranger_2;
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
        let res = buy_f(title, cost, is_Buy);
        setBought(res);
    }

    // ------- RENDER ------- //

    return (
        <div className='shop_item'>
            <button onClick={() => handleClick()} 
                    className= {(is_Buy) ? 'btn shopitem_container bought no-hover' : 'btn shopitem_container'}
                    disabled={is_Buy}
            >
                <h2>{title}</h2>
                <img src={imgBasedOnCharacter()} alt="" />
                <div className='cost_bg'>
                    <div className='cost_text'>
                        <h3>
                        {cost}
                        </h3>
                    </div>
                </div>
            </button>
            
        </div>
    )
}

export default ShopItem
