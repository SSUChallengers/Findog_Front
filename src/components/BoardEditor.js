import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import API from "./../utils/api";

const InputPicker = styled.select`
  @media screen and (max-width: 650px) {
    width: 80vw;
  }
  width: 45vw;
  height: 50px;
  text-align: left;
  border-color: rgba(0, 0, 0, 0.2);
  -webkit-appearance: none;
-moz-appearance: none; 
appearance: none;
`;

const Title = styled.input`
  @media screen and (max-width: 650px) {
    width: 80vw;
  }
  width: 45vw;
  height: 40px;
  margin-bottom: 20px;
  border-color: rgba(0, 0, 0, 0.2);
`;
const Content = styled.textarea`
  @media screen and (max-width: 650px) {
    width: 80vw;
  }
  width: 45vw;
  height: 440px;
  margin-top: 20px;
  border-color: rgba(0, 0, 0, 0.2);
  text-align: left;
  padding: 10px;
`;

const BtnContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

const BtnCancel = styled.button`
  @media screen and (max-width: 650px) {
    width: 40vw;
  }
  width: 20vw;
  height: 50px;
  margin-right: 20px;
  border: none;
  background-color: #ecececdc;
`;

const Container = styled.div`
  width: 50vw;
  @media screen and (max-width: 650px) {
    width: 90vw;
  }
  margin: 0 auto;
  padding: 20px;
  border-color: #ffa45b;
  background-color: white;
  border: 3px solid #ffa45b;
  margin-top: 100px;
`;

const BtnConfirm = styled.button`
  @media screen and (max-width: 650px) {
    width: 40vw;
  }
  width: 20vw;
  height: 50px;
  margin-left: 20px;
  border: none;
  background-color: #ffa45b;
  color: white;
`;

const ImageSelect = styled.form`
  text-align: center;
  padding-left: 100px;
`;

const FileContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  text-align: center;
`;

const ImageContainer = styled.img`
  width: 200px;
  height: 200px;
  object-fit: fill;
  margin: 10px;
`;

const ImageBox = styled.div`
  flex-direction: column;
`;

export const BoardEditor = (props) => {
  let [showImages, setShowImages] = useState([]);
  const [sendingImg, setSendingImg] = useState([]);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    category: 1,
    region: 1,
    content: "",
    title: "",
    userId: sessionStorage.getItem("userID"),
  });

  const [postId, setPostId] = useState(999);
  const [patchState, setPatchState] = useState(props.patchState);

  /** input ?????? ??? title, content ?????? ?????? */
  const onChangeData = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCategory = (e) => {
    setInputs({
      ...inputs,
      category: Number(e.target.value),
    });
  };

  const onChangeRegion = (e) => {
    setInputs({
      ...inputs,
      region: Number(e.target.value),
    });
  };

  /** ?????? ?????? */
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);

      sendingImg.push(imageLists[i]);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
      sendingImg = sendingImg.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };

  /** ?????? ?????? */
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
    setSendingImg(sendingImg.filter((_, index) => index !== id));
  };

  /** ???????????? ????????? ????????? ????????? ?????? */
  const onClickUpload = async () => {
    if (patchState === false) {
      if (inputs.content === "" || inputs.title === "") {
        alert("????????? ????????? ?????? ??????????????????.");
        return;
      } else {
        try {
          console.log("??????");
          const formData = new FormData();

          formData.append("userId", Number(inputs.userId));
          formData.append("title", inputs.title);
          formData.append("category", Number(inputs.category));
          formData.append("content", inputs.content);
          formData.append("region", Number(inputs.region));

          Object.values(sendingImg).forEach((image) =>
            formData.append("imgFiles", image)
          );

          console.log("????????????");
          await API.post("/boards/post", formData, {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
          }).then((response) => {
            console.log(response.data.isSuccess);

            if (response.data.isSuccess) {
              console.log("???????????? ?????????????????????.");
              alert("???????????? ?????????????????????!");
              setPostId(response.data.result.postId);
            } else {
              console.log(response.data.isSuccess);
              console.log(response.data.message);
            }
          });
        } catch (e) {
          console.log(e.response);
        }
        console.log("?????????");
      }
    }
  };

  useEffect(() => {
    if (postId !== 999 && patchState === false) {
      navigate(`/board/detail/${postId}`, { state: { myBoard: false } });
      console.log("==????????? ??????==");
    }
  }, [postId, patchState]);

  return (
    <div>
      <Container>
        {/* title */}
        <div>
          <Title
            type="text"
            placeholder=" ??????"
            id="title"
            name="title"
            onChange={onChangeData}
          />
        </div>
        <div>
          <InputPicker
            style={{ marginBottom: "20px" }}
            onChange={onChangeCategory}
          >
            <option key={1} value={1}>
              ???????????????
            </option>
            <option key={2} value={2}>
              ?????????
            </option>
            <option key={3} value={3}>
              ???????????????
            </option>
            <option key={4} value={4}>
              ??????
            </option>
          </InputPicker>
          <InputPicker onChange={onChangeRegion}>
            <option>??????</option>
            <option key={1} value={1}>
              ??????
            </option>
            <option key={2} value={2}>
              ??????
            </option>
            <option key={3} value={3}>
              ??????
            </option>
            <option key={4} value={4}>
              ??????
            </option>
            <option key={5} value={5}>
              ??????
            </option>
            <option key={6} value={6}>
              ??????
            </option>
            <option key={7} value={7}>
              ??????
            </option>
            <option key={8} value={8}>
              ??????
            </option>
            <option key={9} value={9}>
              ??????
            </option>
            <option key={10} value={10}>
              ??????
            </option>
            <option key={11} value={11}>
              ??????
            </option>
            <option key={12} value={12}>
              ??????
            </option>
            <option key={13} value={13}>
              ??????
            </option>
          </InputPicker>
        </div>
        {/* content */}
        <div>
          <Content
            type="textarea"
            id="content"
            name="content"
            onChange={onChangeData}
          />
        </div>
        {/* ?????? ????????? ?????? */}
        <div>
          <div>
            {/* <strong>????????? ?????????</strong> */}
            <FileContainer>
              {showImages.map((image, id) => (
                <ImageBox>
                  <ImageContainer src={image} alt={`${image}-${id}`} />
                  <div>
                    <button onClick={() => handleDeleteImage(id)}>??????</button>
                  </div>
                </ImageBox>
              ))}
            </FileContainer>
          </div>
          <ImageSelect>
            <input
              type="file"
              id="image"
              accept="img/*"
              multiple="multiple"
              onChange={handleAddImages}
            />
            <label htmlFor="image"></label>
          </ImageSelect>
        </div>
      </Container>
      <BtnContainer>
        <Link to="/board">
          <BtnCancel>??????</BtnCancel>
        </Link>
        <BtnConfirm
          onClick={() => {
            onClickUpload();
            // goToPost();
          }}
        >
          ??????
        </BtnConfirm>
      </BtnContainer>
    </div>
  );
};

BoardEditor.defaultProps = {
  patchPostId: 999,
  patchState: false,
  title: "",
  content: "",
  region: "",
  imgList: "",
};
