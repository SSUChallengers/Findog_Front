import styled from "styled-components";
import React, { useState, useEffect } from "react";
import AnimalImageSearch from "./AnimalImageSearch";

const Container = styled.div`
  width: 95vw;
  margin-top: 30px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const ContainerSearch = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

const BoxSearch = styled.div`
  display: flex;
  font-size: 1.2vw;
  line-height: 3vw;
  height: 3vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const BoxFilter = styled.div`
  font-size: 1.2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const BtnImgSearch = styled.button`
  width: 7vw;
  height: 3vw;
  line-height: 3vw;
  border-radius: 30px;
  border: solid;
  color: black;
  background-color: white;
  border-color: rgba(255, 164, 91);
  border-width: 2px;
  font-size: 1.2vw;
  min-width: fit-content;
  margin-left: 2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const InputSearch = styled.input`
  width: 15vw;
  height: 3vw;
  border: none;
  padding-inline: 10px;
  font-size: 1.2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const InputOption = styled.input`
  width: 8vw;
  height: 3vw;
  border: none;
  padding-inline: 10px;
  font-size: 1.2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
`;

const BtnSearch = styled.button`
  width: 7vw;
  height: 3vw;
  border: none;
  background-color: rgba(255, 164, 91);
  font-size: 1.2vw;
  min-width: fit-content;
  margin-left: 2vw;
  color: black;
`;

const InputPicker = styled.select`
  width: 10vw;
  height: 3vw;
  color: black;
  border: none;
  margin-left: 2vw;
  @media screen and (max-width: 650px) {
    font-size: 2vw;
  }
  text-align: left;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

function AnimalOptionTab({ setOptions }) {
  const [inputs, setInputs] = useState({
    word: "",
    region: "",
    category: "",
    breed: "",
    status: "",
  });
  const [dialog, setDialog] = useState(false);

  const onSubmit = (b) => {
    if (b) {
      setOptions(inputs);
    } else {
      const reset = {
        word: "",
        region: "",
        category: "",
        breed: "",
        status: "",
      };
      ImageSearch(reset);
    }
  };

  const onClose = () => {
    setDialog(false);
  };

  const onClick = () => {
    setDialog(true);
  };

  const ImageSearch = (reset) => {
    setInputs(reset);
    setOptions(reset);
  };

  return (
    <Container>
      <ContainerSearch>
        <div>
          <div style={{ display: "flex" }}>
            {/* ?????? */}
            <BoxSearch>
              <InputSearch
                placeholder="??????, ????????????, ?????? ???"
                value={inputs.word}
                name="word"
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    word: e.target.value,
                  })
                }
              ></InputSearch>
            </BoxSearch>
            <BoxSearch style={{ marginLeft: "2vw" }}>
              <InputOption
                placeholder="???/???/???"
                value={inputs.region}
                name="region"
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    region: e.target.value,
                  })
                }
              ></InputOption>
            </BoxSearch>
            <BoxFilter>
              <InputPicker
                value={inputs.category}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    category: e.target.value,
                  })
                }
              >
                <option key={1} value={""}>
                  ?????? ??????
                </option>
                <option key={2} value={"???"}>
                  ???
                </option>
                <option key={3} value={"?????????"}>
                  ?????????
                </option>
                <option key={4} value={"??????"}>
                  ??????
                </option>
              </InputPicker>
            </BoxFilter>
            {/* {inputs.category !== "" && (
              <BoxSearch style={{ marginLeft: "2vw" }}>
                <InputOption
                  style={{ width: "15vw" }}
                  placeholder="?????? ex) ?????????, ??????"
                  value={inputs.breed}
                  name="breed"
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      breed: e.target.value,
                    })
                  }
                ></InputOption>
              </BoxSearch>
            )} */}
            <BoxFilter>
              <InputPicker
                value={inputs.status}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    status: e.target.value,
                  })
                }
              >
                <option key={1} value={""}>
                  ??????
                </option>
                <option key={2} value={"?????????"}>
                  ?????????
                </option>
                <option key={3} value={"??????"}>
                  ??????
                </option>
              </InputPicker>
            </BoxFilter>
            <BtnSearch
              onClick={() => {
                onSubmit(true);
              }}
            >
              ??????
            </BtnSearch>
            <BtnSearch
              onClick={() => {
                onSubmit(false);
              }}
            >
              ?????? ?????????
            </BtnSearch>
            <BtnImgSearch onClick={onClick}>?????? ??????</BtnImgSearch>
          </div>
        </div>
      </ContainerSearch>
      {dialog ? (
        <AnimalImageSearch
          onClose={onClose}
          ImageSearch={ImageSearch}
        ></AnimalImageSearch>
      ) : null}
    </Container>
  );
}

export default AnimalOptionTab;
