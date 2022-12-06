import React, { useState, useEffect } from 'react'
import './InventoryBox.css'
import InventoryList from './InventoryList'
import InventoryInterface from './InventoryInterface'

const LOCAL_STORAGE_KEY = "GIFTBOX"

const InventoryBox = () => {
    const [items, setList] = useState([]);
    /**
   * Store data on local storage
   */
    useEffect(() => {
        const storageItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageItems) {
            setList(storageItems);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    }, [items]);

    function toggleEquipped(id) {
        setList(
            items.map(item => {
            if (item.id === id) {
              return {
                ...item,
                equipped: !item.equipped
              };
            }
            return item;
          })
        );
      }

    /**
 * Method to adda gift 
 * @param {*} item 
 */
    function addItem(item) {
        console.log("added");
        setList([...items, item]);
    }

    return (
        <div className='inventorybox-container'>
            <div className='box'>
                <h2>Inventory</h2>
                <InventoryInterface addItem={addItem} />
                <InventoryList items={items} toggleEquipped={toggleEquipped} />
            </div>
        </div>
    )
}

export default InventoryBox