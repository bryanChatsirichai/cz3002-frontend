import React from 'react'

class LocalStorageInterface extends React.Component{
    constructor(props){
        super(props);
    }

    LocalStorageUpdate(key, item){
        localStorage.setItem(key, JSON.stringify(item))
    }

    LocalStorageInit(key){
        const storageItems = JSON.parse(localStorage.getItem(key));
        if (storageItems) {
            return storageItems;
        }
        else{
            return null;
        }
    }
}

export default LocalStorageInterface