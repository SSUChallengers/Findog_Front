import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import API from "./../utils/api";
import { type } from "@testing-library/user-event/dist/type";
import { AuthLogin } from "../utils/utils";

const Container = styled.div`
  width: 60vw;
  height: fit-content;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 164, 91, 0.1);
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  text-align: center;
  white-space: nowrap;
  color: #ffa45b;
  font-size: 25px;
  padding: 20px;
  font-weight: bold;
`;

const BoxContainer = styled.div`
  white-space: nowrap;
  border-left: #ffa45b;
  margin-left: 10%;
`;

const BoxWrapper = styled.div`
  margin-top: 10px;
`;

const Box = styled.div`
  width: 100%;
  text-align: left;
  cursor: auto;
`;

const BoxText = styled.div`
  min-width: 13vw;
  width: 13vw;
  text-align: left;
  display: inline-block;
  margin-right: 2vw;
  font-weight: bold;
  font-size: 1vw;
`;

const Profile = styled.div`
  width: 70vw;
  text-align: left;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  font-size: 2vw;
  cursor: auto;
`;

const ProfileText = styled.div`
  min-width: 13vw;
  width: 13vw;
  text-align: left;
  display: inline-block;
  margin-right: 2vw;
  font-weight: bold;
  font-size: 1vw;
`;

const SelectProfileBox = styled.div`
  width: fit-content;
  text-align: left;
  vertical-align: top;
  margin-top: 5px;
  padding: 1vw;
  font-size: 1vw;

  cursor: pointer;
`;

const ProfileImageWrap = styled.div`
  width: 30vw;
  display: inline-block;
  text-align: left;
  border: none;
`;

const ProfileImage = styled.img`
  min-width: 50px;
  min-height: 50px;
  width: 5vw;
  height: 5vw;
  display: inline-block;
  justify-content: center;
  padding: 3px;
  border: none;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  float: right;
`;

const BtnWrap = styled.div`
  white-space: nowrap;
`;

const Btn = styled.button`
  width: 30%;
  height: 40px;
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 1.5vw;
  color: white;
  border-radius: 5px;
  margin-bottom: 100px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.background};
`;

const BoxSearch = styled.div`
  width: fit-content;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  display: inline-block;
`;

const InputSearch = styled.input`
  width: 20vw;
  min-width: fit-content;
  height: 5vh;
  border: none;
  display: inline-block;
  border-radius: 3px;
  padding-inline: 1vw;
  font-size: 1vw;
  :focus {
    outline: 1px solid #ffa45b;
  }
  ::placeholder {
    font-size: 1px;
  }
`;

const ErrorNotification = styled.div`
  width: 50vw;
  height: 40px;
  border: none;
  display: inline-block;
  text-align: left;
  margin-top: 2px;
  font-size: smaller;
  color: red;
  margin-left: 15vw;
  font-size: 1px;
`;

const BtnSearch = styled.button`
  min-width: fit-content;
  height: 5vh;
  border: none;
  display: inline-block;
  border-radius: 3px;
  background-color: rgba(255, 164, 91, 0.3);
  font-size: 1vw;
`;

function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
  });

  const { id, nickname, password, passwordCheck, phoneNumber } = inputs; // ???????????? ????????? ?????? ??? ??????

  /** ?????? ?????? ?????? */
  const default_profile_img = "https://ifh.cc/g/jLgWsT.png";

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: default_profile_img,
  });
  const [defaultImg, setDefaultImg] = useState(true);
  const fileInput = useRef(null);

  /** ID ?????? ?????? */
  const [isIdChecked, setIsIdChecked] = useState(false); // ???????????? ??????
  const [isIdValidate, setIsIdValidate] = useState(false); // ????????? ??????
  const [idNotification, setIdNotification] = useState(false);
  const [idOpacity, setIdOpacity] = useState(0.7);
  const idNotiArray = [
    "????????? ????????? ???????????? ????????????.",
    "?????? ???????????? ??????????????????.",
  ];
  const [idNotiText, setIdNotiText] = useState(idNotiArray[0]);

  /** ????????? ?????? ?????? */
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // ???????????? ??????
  const [nicknameNotification, setNicknameNotification] = useState(false); // ????????? ??????
  const [isNicknameValidate, setIsNicknameValidate] = useState(false);
  const [nicknameOpacity, setNicknameOpacity] = useState(0.7);
  const nicknameNotiText = "?????? ???????????? ??????????????????.";

  /** ???????????? ?????? ?????? */
  const [isPwChecked, setIsPwChecked] = useState(false); // ???????????? ???????????? ??????
  const [pwNotification, setPwNotification] = useState(true); // ???????????? ?????? ?????? ??????
  const [pwCheckNotification, setPwCheckNotification] = useState(false); // ???????????? ?????? ????????? ?????? ??????
  const pwNotiArray = [
    "8~15??? ????????? ??????????????????.",
    "??????,??????, ??????????????? ???????????? ??????????????????.",
  ];
  const [pwNotiText, setPwNotiText] = useState(pwNotiArray[0]);

  /** ????????? ?????? ?????? */
  const [isPhonenumChecked, setIsPhonenumChecked] = useState(false);
  const [phoneNumNotification, setPhoneNumNotification] = useState(false); // ????????? ??????
  const phoneNumNotiText = "????????? ?????? ????????? ???????????? ????????????.";

  const [isAllChecked, setIsAllChecked] = useState(false);

  const onInputChange = (e) => {
    const { value, name } = e.target; // ?????? e.target ?????? name ??? value ??? ??????

    setInputs({
      ...inputs, // ????????? input ????????? ????????? ???
      [name]: value, // name ?????? ?????? ?????? value ??? ??????
    });
  };

  useEffect(() => {
    console.log("???????????????");
  }, [defaultImg]);

  /** ???????????? ?????? ????????? */
  useEffect(() => {
    if (isIdChecked && isNicknameChecked && isPwChecked && isPhonenumChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [
    isIdChecked,
    isNicknameChecked,
    isPwChecked,
    isPhonenumChecked,
    defaultImg,
  ]);

  /** ???????????? ????????? ?????? */
  const setPasswordValidation = () => {
    if (password === "" || passwordCheck === "") {
      setIsPwChecked(false);
      setPwNotification(false);
      setPwCheckNotification(false);
    }
    if (password !== "") {
      if (password.length >= 8 && password.length <= 15) {
        if (
          !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password)
        ) {
          setPwNotification(true);
          setPwNotiText(pwNotiArray[1]);
        }
      } else {
        setPwNotification(true);
        setPwNotiText(pwNotiArray[0]);
      }
    }
    if (passwordCheck !== "") {
      if (password === passwordCheck) {
        console.log("??????");
        setIsPwChecked(true);
        setPwCheckNotification(false);
      } else {
        console.log("??????");
        setIsPwChecked(false);
        setPwCheckNotification(true);
      }
    }
  };

  /** ????????? ????????? ?????? */
  useEffect(() => {
    if (id === "") {
      setIdNotification(false);
      setIsIdValidate(false);
      setIdOpacity(0.7);
    } else {
      var regExp =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

      if (regExp.test(id)) {
        setIdNotification(false);
        setIsIdValidate(true);
        setIdOpacity(1);
      } else {
        setIdNotification(true);
        setIdNotiText(idNotiArray[0]);
        setIsIdValidate(false);
        setIdOpacity(0.7);
      }
    }
    setIsIdChecked(false);
  }, [id]);

  /** ????????? ????????? ?????? (????????? ????????? ???) */
  useEffect(() => {
    if (nickname === "") {
      setIsNicknameValidate(false);
      setNicknameOpacity(0.7);
    } else {
      setIsNicknameValidate(true);
      setNicknameOpacity(1);
    }
    setIsNicknameChecked(false);
  }, [nickname]);

  useEffect(() => {
    setPasswordValidation();
  }, [password]);

  useEffect(() => {
    setPasswordValidation();
  }, [passwordCheck]);

  /** ????????? ?????? ????????? & ????????? ?????? */
  useEffect(() => {
    if (phoneNumber === "") {
      setPhoneNumNotification(false);
    } else {
      setInputs({
        ...inputs,
        phoneNumber: phoneNumber
          .replace(/[^0-9]/g, "")
          .replace(
            /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
            "$1-$2-$3"
          )
          .replace("--", "-"),
      });

      if (phoneNumber.length === 13 && /^[0-9\b -]{0,13}$/.test(phoneNumber)) {
        var regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (regPhone.test(phoneNumber) === true) {
          setPhoneNumNotification(false);
          setIsPhonenumChecked(true);
        } else {
          setPhoneNumNotification(true);
          setIsPhonenumChecked(false);
        }
      } else {
        setPhoneNumNotification(true);
        setIsPhonenumChecked(false);
      }
    }
  }, [phoneNumber]);

  /** ????????? ?????? ????????? */
  const OnProfileChange = (e) => {
    //????????? ????????? ?????? ??????
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setDefaultImg(false);
    } else {
      //????????? ????????? ???
      // setImage(image);
    }

    reader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: reader.result,
      });
    };
  };

  /** ????????? ???????????? */
  const checkDuplicateId = async () => {
    try {
      const params = { email: id };
      const res = await API.get("/users/chk-email", { params }); // API ??? get ?????? ????????? ????????????, ?????? ?????? res ??? ??????
      console.log(res.data);
      if (res.data.isSuccess) {
        setIsIdChecked(true);
        setIdNotification(false);
      } else {
        setIdNotification(true);
        setIdNotiText(idNotiArray[1]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** ????????? ???????????? */
  const checkDuplicateNickname = async () => {
    try {
      const params = { nickname: nickname };
      console.log("????????????", params);
      const res = await API.get("/users/chk-nickname", { params }); // API ??? get ?????? ????????? ????????????, ?????? ?????? res ??? ??????
      console.log(res.data);
      if (res.data.isSuccess) {
        setIsNicknameChecked(true);
        setNicknameNotification(false);
      } else {
        setNicknameNotification(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** ???????????? api ?????? */
  const onSubmit = async () => {
    try {
      console.log("??????");
      const formData = new FormData();

      // formData.append(JSON.stringify(data));
      formData.append("email", id);
      formData.append("nickname", nickname);
      formData.append("password", password);
      formData.append("phoneNum", phoneNumber);

      if (!defaultImg) {
        console.log("?????? ??????");
        console.log(image.image_file);
        formData.append("profileImg", image.image_file);
        console.log(type(image.image_file));
      }

      await API.post("/users/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((response) => {
          if (response.data.isSuccess) {
            AuthLogin(response.data.result.userJWT);
            alert("??????????????? ??????????????????.");
            setTimeout(() => console.log("after"), 2000);
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
      <Header>????????????</Header>

      <BoxContainer>
        <Divider></Divider>
        <Profile>
          <ProfileText>???????????????</ProfileText>
          <ProfileImageWrap>
            <ProfileImage src={image.preview_URL}></ProfileImage>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              name="profile_img"
              onChange={OnProfileChange}
              ref={fileInput}
            />
            <div style={{ display: "flex", marginBottom: "30px" }}>
              <SelectProfileBox
                onClick={() => {
                  fileInput.current.click();
                }}
              >
                ?????? ?????????
              </SelectProfileBox>
              <SelectProfileBox> | </SelectProfileBox>
              <SelectProfileBox
                onClick={() => {
                  setImage({
                    image_file: "",
                    preview_URL: default_profile_img,
                  });
                  setDefaultImg(true);
                }}
              >
                ?????? ????????? ??????
              </SelectProfileBox>
            </div>
          </ProfileImageWrap>
        </Profile>
        <Divider></Divider>
        <BoxWrapper>
          <Box>
            <BoxText>?????????(?????????)</BoxText>

            <InputSearch name="id" onChange={onInputChange} value={id} />
            <BtnSearch
              disabled={!isIdValidate}
              style={{ opacity: idOpacity }}
              onClick={checkDuplicateId}
            >
              ????????????
            </BtnSearch>

            {isIdChecked && (
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {idNotification && (
            <ErrorNotification>{idNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <Divider></Divider>
        <BoxWrapper>
          <Box>
            <BoxText>?????????</BoxText>
            <BoxSearch>
              <InputSearch
                name={"nickname"}
                onChange={onInputChange}
                value={nickname}
              />
              <BtnSearch
                disabled={!isNicknameValidate}
                style={{ opacity: nicknameOpacity }}
                onClick={checkDuplicateNickname}
              >
                ????????????
              </BtnSearch>
            </BoxSearch>
            {isNicknameChecked && (
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {nicknameNotification && (
            <ErrorNotification>{nicknameNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <Divider></Divider>
        <BoxWrapper>
          <Box>
            <BoxText>????????????</BoxText>
            <BoxSearch>
              <InputSearch
                type={"password"}
                name={"password"}
                onChange={onInputChange}
                value={password}
                placeholder="??? ?????? ????????????, ??????, ??????????????? ????????? 8~15??? ??????"
                maxLength="15"
              />
            </BoxSearch>
          </Box>
          {pwNotification && (
            <ErrorNotification>{pwNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Divider></Divider>
          <Box>
            <BoxText>???????????? ??????</BoxText>
            <BoxSearch>
              <InputSearch
                name={"passwordCheck"}
                onChange={onInputChange}
                value={passwordCheck}
                maxLength="15"
              />
            </BoxSearch>
            {isPwChecked && (
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {pwCheckNotification && (
            <ErrorNotification>??????????????? ???????????? ????????????.</ErrorNotification>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Divider></Divider>
          <Box>
            <BoxText>?????????</BoxText>
            <BoxSearch>
              <InputSearch
                name={"phoneNumber"}
                onChange={onInputChange}
                value={phoneNumber}
                maxLength="13"
              />
            </BoxSearch>
            {isPhonenumChecked && (
              <CheckIcon size="2x" icon={faCheck} color="#FFA45B"></CheckIcon>
            )}
          </Box>
          {phoneNumNotification && (
            <ErrorNotification>{phoneNumNotiText}</ErrorNotification>
          )}
        </BoxWrapper>
      </BoxContainer>

      <BtnWrap>
        <Link to="/login">
          <Btn
            background="white"
            style={{
              color: "black",
              border: "solid",
              borderColor: "rgba(255, 164, 91, 0.3)",
            }}
          >
            ??????
          </Btn>
        </Link>
        <Btn background="#FFA45B" disabled={!isAllChecked} onClick={onSubmit}>
          ????????????
        </Btn>
      </BtnWrap>
    </Container>
  );
}

export default SignUp;
