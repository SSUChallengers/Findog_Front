import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Tab from "./components/Tab";
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import { BoardEditor } from "./components/BoardEditor";
import { Board } from "./pages/Board";
import AbandonedAnimal from "./pages/AbandonedAnimal";
import MyPage from "./pages/MyPage";
import { BoardDetail } from "./pages/BoardDetail";

function App() {
  const currentTab = () => {
    let path = window.location.pathname;
    console.log("경로", path);
    if (path == "/") return 1;
    else if (path == "/board") return 2;
    else if (path == "/*") return 3;
    else if (path.includes("/mypage/")) return 4;
  };

  const [tabMenu, setTabMenu] = useState(currentTab);

  const tabMenuChange = (tabMenu) => {
    setTabMenu(tabMenu);
    console.log("tab menu 바뀜", tabMenu);
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
          <Route path="/mypage/*" element={<MyPage />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/board/edit" element={<BoardEditor />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/board/detail/*" element={<BoardDetail />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
