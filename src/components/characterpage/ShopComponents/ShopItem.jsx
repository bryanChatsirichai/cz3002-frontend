import React from 'react'
import './ShopItem.css'
const ShopItem = ({name, removeFromList}) => {
    // const CheckCost = () =>{

    // }
    // const CheckSpace = () =>{

    // }
    // const AddToInventory = () =>{

    // }
    // const handleOnClickBuy = event => {
    //     // Collect gift logic
    //     removeFromList();
    // }

    return (
    <div className='shopitem'>
        <h4 className="itemname">{name}</h4>
    </div>
    )
}

export default ShopItem