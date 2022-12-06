import React from 'react'
import CharacterPage from './components/characterpage/CharacterPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BattlePage from './components/battle_page/BattlePage';
import ShopPage from './components/shop_page/ShopPage'

import Title from './components/auth/Title'
const App = () => {
  
  function ClearLocalStorage(){
    localStorage.clear();
  }

  const renderContent = () => (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="profile" element={<CharacterPage/>}/>
          <Route path="battle" element={<BattlePage/>}/>
          <Route path="shop" element={<ShopPage/>}/>
          <Route path="title" element={<Title/>}/>
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
  // Testing
  //ClearLocalStorage();
  return (
    <div>
        <div>
          {renderContent()}
        </div>
    </div>
  )
}

export default App