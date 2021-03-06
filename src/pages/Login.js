import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import API from "./../utils/api";

const Container = styled.div`
  width: 40vw;
  height: fit-content;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  @media screen and (max-width: 650px) {
    width: 60vw;
  }
`;

const Header = styled.div`
  text-align: center;
  color: #ffa45b;
  font-size: 1.5vw;
  padding: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BoxContainer = styled.div`
  width: 100%;
  border-left: #ffa45b;
  text-align: left;
`;

const Box = styled.input`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  font-size: 1.5vw;
  border: none;
  background-color: white;
  :focus {
    outline: 1px solid #ffa45b;
  }
  cursor: auto;
`;

const LoginBtn = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 15px;
  font-size: 1.5vw;
  background-color: #ffa45b;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 164, 91, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  font-size: 20px;
  margin-bottom: 100px;
  justify-content: center;
`;

const Signup = styled.span`
  font-size: 1.2vw;
  font-weight: 300;
  display: inline-block;
  color: #FFA45B;
  justify-content: right;
`;

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onInputChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  /** 로그인 api 호출 */
  const onSubmit = async () => {
    try {
      let data = {
        email: email,
        password: password,
      };
      await API.post("/users/log-in", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("로그인 되었습니다.");
            sessionStorage.setItem("userJWT", response.data.result.userJWT);
            sessionStorage.setItem("userID", response.data.result.userId);
            sessionStorage.setItem(
              "profileImgUrl",
              response.data.result.profileImgUrl
            );
            navigate("/");
            window.location.reload();
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <Container>
      <Header>Login</Header>
      <Divider></Divider>
      <BoxContainer>
        <div>
          <Box
            placeholder="아이디(이메일)"
            name={"email"}
            onChange={onInputChange}
            value={email}
          ></Box>
        </div>
        <div>
          <Box
            type={"password"}
            placeholder="비밀번호"
            name={"password"}
            onChange={onInputChange}
            value={password}
          ></Box>
        </div>
      </BoxContainer>
      <LoginBtn onClick={onSubmit}>로그인</LoginBtn>
      <Divider></Divider>
      <Bottom>
        <Link to="/signup" style={{justifyContent:"right"}}>
          <Signup>회원가입</Signup>
        </Link>
      </Bottom>
    </Container>
  );
}

export default Login;
