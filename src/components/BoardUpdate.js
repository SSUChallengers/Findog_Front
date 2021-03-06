import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import API from "../utils/api";

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

export const BoardUpdate = () => {
  // inputPostId,
  // inputTitle,
  // inputCategory,
  // inputRegion,
  // inputContent,
  // inputImgList,
  const location = useLocation();

  console.log("===location===");
  console.log(location.state);

  let [showImages, setShowImages] = useState(location.state.locImgList);
  const [sendingImg, setSendingImg] = useState([]);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    category: location.state.locCategory,
    region: 1,
    content: location.state.locContent,
    title: location.state.locTitle,
    userId: sessionStorage.getItem("userID"),
  });

  const [postId, setPostId] = useState(location.state.locPostId);

  useEffect(() => {
    if (location.state.locImgList != null) {
      location.state.locImgList.map((item) => {
        const convertURLtoFile = async (item) => {
          const response = await fetch(item);
          const data = await response.blob();
          const ext = item.split(".").pop();
          const filename = item.split("/").pop(); // ??? ?????????  file?????????..
          const metadata = { type: `image/${ext}` };
          return new File([data], filename, metadata);
        };

        convertURLtoFile(item).then((response) => {
          sendingImg.push(response);
        }); // ????????? then
      });
    }
    // fetch(item,
    //   {
    //     mode:"no-cors"
    //   }).then(async (response) => {
    //   const contentType = response.headers.get("content-type");
    //   const blob = await response.blob();
    //   const file = new File([blob], "image."+ item.slice(-3), { contentType });
    //   console.log("????????????",file);
    //   sendingImg.push(file);
    //   // access file here
    // });

    // setShowImages(imageUrlLists);
  }, []);

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
      category: e.target.value,
    });
  };

  const onChangeRegion = (e) => {
    setInputs({
      ...inputs,
      region: e.target.value,
    });
  };

  // category select
  const handleSelect = (e) => {
    setInputs({
      ...inputs,
      categoy: e.target.value,
    });
    console.log("handle select");
    console.log(e.target.value);
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

    console.log("??????", sendingImg);

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
    // console.log(postId);
    // console.log(inputs);

    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("category", Number(inputs.category));
      formData.append("region", Number(inputs.region));
      formData.append("content", inputs.content);

      Object.values(sendingImg).forEach((image) =>
        formData.append("imgFiles", image)
      );

      for (var value of formData.values()) {
        console.log("?????????", value);
      }

      // JSON.stringify(data)
      await API.patch(`/boards/update/${postId}`, formData, {
        headers: {
          "X-ACCESS-TOKEN": sessionStorage.getItem("userJWT"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            alert("???????????? ?????????????????????.");
            navigate("/board/detail/" + postId, { state: { myBoard: false } });
          } else {
            console.log(response);
            alert("????????? ????????? ??????????????????.");
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
            defaultValue={inputs.title}
          />
        </div>
        <div>
          <InputPicker
            style={{ marginBottom: "20px" }}
            onChange={onChangeCategory}
            defaultValue={inputs.category}
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
          <InputPicker onChange={onChangeRegion} defaultValue={inputs.region}>
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
            defaultValue={inputs.content}
          />
        </div>
        {/* ?????? ????????? ?????? */}
        <div>
          <div>
            {/* <strong>????????? ?????????</strong> */}
            <FileContainer>
              {showImages.map((image, id) => (
                <ImageBox key={id}>
                  <ImageContainer src={image} alt={`${image}`} />
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
        <BtnConfirm onClick={onClickUpload}>??????</BtnConfirm>
      </BtnContainer>
    </div>
  );
};
