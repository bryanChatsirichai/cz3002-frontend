import React, {useState} from 'react'
// import {v4 as uuidv4} from 'uuid'

// const TEST_INVENTORY_NAME = "Tmp_Item"

function InventoryInterface({ addItem }){
    // const [item, setItem] = useState({
    //     id: "",
    //     name: "",
    //     type: "",
    //     power: "",
    //     equipped: false
    //   });
    
      // function addItemToInventory(itemName, itemType, itemPower){
      //   if(itemName !== ""){
      //     addItem({ ...item, 
      //               id: uuidv4(), 
      //               name: itemName ,
      //               type: itemType,
      //               power: itemPower
      //           });

      //     setItem({ ...item, name: "" });
      //   }
      // }
      
      // For testing only
      // function handleAddItemToInventory(e) {
      //   e.preventDefault(); // prevents browser refresh
      //   addItemToInventory(TEST_INVENTORY_NAME, 'equipment', 500);
      // }
      // function ClearLocalStorage(){
      //   localStorage.clear();
      // }
  return (
    <div>
      {/* <button className='btn' onClick={ClearLocalStorage}>localclear</button>
      <button className='btn' onClick={handleAddItemToInventory}>test</button> */}
    </div>
  )
}

export default InventoryInterface