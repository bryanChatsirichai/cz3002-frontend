import React from 'react'
import './Shop.css'
import { useState } from 'react'
import ShopItem from './ShopItem'

const FavoriteBox = () => {
  const tmpShopItemName = "Shop_Tmp_Item"
  const [shopList, setList] = useState([]);

  const i_AddShopItem = (shopItemName) => (event) => {
    setList([...shopList, shopItemName]);
  }
  const i_DeleteShopItem = (index) => (event) => {
    const list = [...shopList];
    list.splice(index, 1);
    setList(list);
  }
  return (
    <div className="shop-container">
      <div className='box'>
        <h2>Shop</h2>
        <button className='btn' onClick={(e) => i_AddShopItem(tmpShopItemName)(e)}>
          <h4>test</h4>
        </button>
        <div className='layout-scroll shop-layout'>
          {
            shopList.map((shopItem, index) => <ShopItem key={index} name={shopItem} removeFromList={i_DeleteShopItem(index)} />)
          }
        </div>
      </div>
    </div>
  )
}

export default FavoriteBox