import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Tab from "./Tab";

const Top = styled.div`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: left;
  margin-bottom: 10vh;
  margin-top: 2vh;
`;

const HeaderText = styled.div`
  color: rgb(255, 164, 91);
  width: 20vw;
  font-weight: 900;
  font-size: 3vw;
  height: 4vw;
  line-height: 4vw;
`;

const Container = styled.div`
  width: 10%;
  height: fit-content;
  font-weight: 500;
`;

const ContainerText = styled.div`
  width: 8vw;
  height: 4vw;
  line-height: 4vw;
  font-size: 1.2vw;
  cursor: pointer;
  border-radius: 30px;
  border: solid;
  border-color: rgb(255, 164, 91);
  border-width: 2px;
  color: black;
`;

const TabContainer = styled.div`
  width: fit-content;
  height: 4vw;
  line-height: 4vw;
  margin-right: 5%;
`;

const Wrap = styled.div`
  display: flex;
  width: 70vw;
  justify-content: right;
`;

function Header(props) {
  function setTabMenu(menu) {
    props.tabMenuChange(menu);
  }

  function logout() {
    sessionStorage.removeItem("userJWT");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("profileImgUrl");
    props.isLoginChange(false);
    alert("로그아웃 되었습니다.");
  }

  return (
    <Top>
      <div
        style={{
          width: "20vw",
        }}
      >
        <Link to="/" style={{ textDecorationLine: "none" }}>
          <HeaderText
            onClick={() => {
              setTabMenu(1);
            }}
          >
            {" "}
            Findog
          </HeaderText>
        </Link>
      </div>
      <Wrap>
        <TabContainer>
          <Tab tabMenu={props.tabMenu} tabMenuChange={props.tabMenuChange} />
        </TabContainer>
        <Container>
          {!props.isLogin && (
            <Link to="/login" style={{ textDecorationLine: "none" }}>
              <ContainerText
                onClick={() => {
                  setTabMenu(0);
                }}
              >
                {" "}
                로그인
              </ContainerText>
            </Link>
          )}
          {props.isLogin && (
            <ContainerText
              onClick={() => {
                setTabMenu(0);
                logout();
                // 로그아웃 함수
              }}
            >
              {" "}
              로그아웃
            </ContainerText>
          )}
        </Container>
      </Wrap>
    </Top>
  );
}

export default Header;
