import React from 'react'

const char_item = ({title}) => {

  return (
    <div className="char_item-container">
            <h4>{title}</h4>
            <div className={item.bought ? 'item-body bought' : 'item-body'}>
                <img src={personicon} alt="" />
            </div>
                <h4
                    style={{ color: item.bought ? "gray" : "var(--color-white)" }}
                >
                    {item.bought ? "Equipped" : "Equip"}
                </h4>
        </div>
  )
}

export default char_item