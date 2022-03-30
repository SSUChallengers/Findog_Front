import React, { Component, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Tab from "./components/Tab";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import AbandonedAnimal from "./pages/AbandonedAnimal";
import MyPage from "./pages/MyPage";
import Board from "./pages/Board";

function App() {
  const [tabMenu, setTabMenu] = useState(0);
  console.log(tabMenu);

  const tabMenuChange = (tabMenu) => {
    setTabMenu(tabMenu);
    console.log(tabMenu);
    console.log("tab menu 바뀜");
  };
  

  return (
    <div className="App">
      <BrowserRouter>
        <Header tabMenu={tabMenu} tabMenuChange={tabMenuChange} />
        <Tab tabMenu={tabMenu} tabMenuChange={tabMenuChange} />
        <Routes>
          <Route path="/" element={<AbandonedAnimal />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
