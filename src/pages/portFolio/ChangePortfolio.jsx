import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HeaderHook from '../../components/HeaderHook';
import MdOutlinedFeed from '../../images/MdOutlineFeed.png';
import Vector from '../../images/Vector.png';
import { useNavigate, useParams } from 'react-router-dom';
import Minus from '../../images/AiOutlineMinusCircle.png';
import PlusSquare from '../../images/FiPlusSquare.png';
import EmojiEmotion from '../../images/MdOutlineEmojiEmotions.png';
import saveimg from '../../images/FiSave.png';
import checkimg from '../../images/AiOutlineCheckSquare.png';
import heartimg from '../../images/AiOutlineHeartRed.png';
import { useForm } from '../../hook/useForm';
import { getData, putFormData, postThisIsMe, postOthers, postBingo, delThisIsMe, delBingo, delOthers, getReview, getCertifiedReview } from '../../apis/portFolioapis';
import { myInfo } from '../../apis/mypageapis';


const ChangePortfolio = () => {
  const textarea = useRef();

  const [birth, onChangeBirth] = useForm();
  const [phoneNumber, onChangePhoneNumber] = useForm();
  const [email, onChangeEmail] = useForm();
  const [modifier, setModifier] = useState('');
  const [schoolMajor, onChangeSchMajor] = useForm();
  // const [image, onChangeImage] = useForm();
  const [image, setImage] = useState('');

  const [aboutMeTexts, onChangeAboutMeTexts] = useForm(); //post용
  const [bingoTexts, onChangeBingoTexts] = useForm();
  const [othersTexts, onChangeOthersTexts] = useForm();

  const [newAboutMeTexts, setNewAboutMeTexts] = useState(['']); //get용
  const [newBingoTexts, setNewBingoTexts] = useState(['']);
  const [newOthersTexts, setNewOthersTexts] = useState(['']);
  const [basicInfo, setBasicInfo] = useState('');
  const [username, setUsername] = useState('');
  const [everyReview, setEveryReview] = useState([]);
  const [certifiedReview, setCertifiedReview] = useState([]);

  const [typeImage, setTypeImage] = useState("");
  const [userType,setUserType] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const router = useNavigate();

  //전체 데이터 get 해오기
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await getData();
        setUsername(response.username);
        setBasicInfo(response.basic_information);
        setNewAboutMeTexts(response.this_is_me);
        setNewBingoTexts(response.bingo_complete);
        setNewOthersTexts(response.other_complete);
        setImage(response.basic_information.image);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    fetchDatas();
  }, []);


  //전체 리뷰 get
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReview();
        setEveryReview(response);
      } catch(error) {
        console.error(error);
        throw error;
      }
    };
    fetchReviews();
  }, []);


  //빙고 인증 리뷰 get
  useEffect(() => {
    const fetchCertifiedReviews = async () => {
      try {
        const response = await getCertifiedReview();
        setCertifiedReview(response);
      } catch(error) {
        console.error(error);
        throw error;
      }
    };
    fetchCertifiedReviews();
  }, [isChecked]);

  //textarea 크기 조정
  const handleResizeHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleTextChange = (e) => {
    setModifier(e.target.value);
    handleResizeHeight(e);
  };

  /* const handlePhoneNumberChange = (e) => {
    const userInput = e.target.value.replace(/\D/g, '');
    const formattedInput = userInput
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      .slice(0, 13);

    setPhoneNumber(formattedInput);
  }; */


  //빙고 인증 후기만 보기
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };


  //Info formdata 형식으로 put
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    if (birth) formdata.append("birth", birth);
    if (phoneNumber) formdata.append("phone_number", phoneNumber);
    if (email) formdata.append("email", email);
    if (modifier) formdata.append("modifier", modifier);
    if (schoolMajor) formdata.append("school_major", schoolMajor);
    if (image) formdata.append("image", image);

    const response = await putFormData(formdata);
    // console.log(response.data);
    router('/readportfolio');
  };


  // AboutMe post & del
  const aboutMe = async () => {
    const content =
    {
      "content": aboutMeTexts,
    };
    const response = await postThisIsMe(content);
    console.log(response.data);
    router(0);
  };

  const delAboutMe = async (id) => {
    const response = await delThisIsMe(id);
    // console.log(response.data);
    router(0);
  };


  // Bingo post & del
  const bingoComplete = async () => {
    const content =
    {
      "content": bingoTexts,
    }
    const response = await postBingo(content);
    // console.log(response.data);
    router(0);
  };

  const delBingoComplete = async (id) => {
    const response = await delBingo(id);
    // console.log(response.data);
    router(0);
  };



  // Others post & del
  const othersComplete = async () => {
    const content =
    {
      "content": othersTexts,
    }
    const response = await postOthers(content);
    // console.log(response.data);
    router(0);
  };

  const delOthersComplete = async (id) => {
    const response = await delOthers(id);
    // console.log(response.data);
    router(0);
  };


  //리뷰글로 이동
  const toReview = (id) => {
    router(`/viewreview/${id}`)
  };

  return (
    <>
      <HeaderHook></HeaderHook>
      <BackgroundWrapper />
      <ProfileImage>
        <img src={image} style={{ height: '128px', width: '128px', borderRadius: '50%'}}></img>
      </ProfileImage>
      <SaveBtn>
        <button onClick={handleSubmit} style={{ cursor: 'pointer' }}><img src={saveimg}></img></button>
      </SaveBtn>
      <Body>
        <ProfileWrapper>
          <ProfileTitle>
            <SectionTitle style={{ position: 'relative', bottom: '10px' }}>{username}, who are you?</SectionTitle>
            <textarea
              ref={textarea}
              value={modifier}
              onChange={handleTextChange}
              rows={3}
              placeholder={basicInfo.modifier ? basicInfo.modifier : '나에게 맞는 수식어를 입력해주세요.'}></textarea>
          </ProfileTitle>
          <Info>
            <InfoItem>
              <InfoLabel>생년월일</InfoLabel>
              <input type='date' value={birth} onChange={onChangeBirth}></input>
            </InfoItem>
            <InfoItem>
              <InfoLabel>학교 & 전공</InfoLabel>
              <input 
                type='text' 
                value={schoolMajor} 
                onChange={onChangeSchMajor}
                placeholder={basicInfo.school_major ? basicInfo.school_major : '학교와 전공을 입력해주세요.'} > 
              </input>
            </InfoItem>
            <InfoItem>
              <InfoLabel>연락처</InfoLabel>
              <input 
                type='tel' 
                value={phoneNumber} 
                onChange={onChangePhoneNumber} 
                placeholder={basicInfo.phone_number ? basicInfo.phone_number : '연락처를 입력해주세요.'} >
              </input>
            </InfoItem>
            <InfoItem>
              <InfoLabel>E-mail</InfoLabel>
              <input 
                type='email' 
                value={email} 
                onChange={onChangeEmail} 
                placeholder={basicInfo.email ? basicInfo.email : '자주 쓰는 이메일을 입력해주세요.'} >
                </input>
            </InfoItem>
          </Info>
        </ProfileWrapper>
        <AchievementWrapper>
          <SectionTitle> {username}님의 휴 are you</SectionTitle>
          <p>휴학 기간에 달성한 사소한 목표부터 자랑하고픈 업적까지 모두 기록해보세요.</p>
          <AboutMeWrapper>
            <SubTitle>
              <img src={EmojiEmotion} style={{ width: '24px', height: '24px', paddingRight: '5px' }}></img>
              {username}, who are you?
            </SubTitle>
            <ContentLists>
              <ContentWrapper>
                {newAboutMeTexts.map((data) => (
                  <div key={data.id} style={{ display: 'flex'}}>
                    <img 
                      src={Minus} 
                      style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                      onClick={() => delAboutMe(data.id)} 
                    />
                    <ContentList>
                      <div>{data.content}</div>
                    </ContentList>
                  </div>
                ))}
              </ContentWrapper>
              <AddContent>
                <InputBox
                  type="text"
                  value={aboutMeTexts}
                  onChange={onChangeAboutMeTexts}
                  placeholder={`${username} 님에 대해 이야기해주세요`}
                />
                <img src={PlusSquare} style={{ width: '26px', height: '26px' }} onClick={aboutMe} />
              </AddContent>
            </ContentLists>
          </AboutMeWrapper>
          <HueWrapper>
            <ClearWrapper>
              <SubTitle>
                <img src={EmojiEmotion} style={{ width: '24px', height: '24px', paddingRight: '5px' }}></img>
                달성한 빙고 한 눈에 보기
              </SubTitle>
              <Content>
                <ContentLists>
                  <ContentWrapper>
                    {newBingoTexts.map((data) => (
                      <div key={data.id} style={{ display: 'flex'}}>
                        <img 
                          src={Minus} 
                          style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                          onClick={() => delBingoComplete(data.id)} 
                        />
                        <ContentList>
                          <div>{data.content}</div>
                        </ContentList>
                      </div>
                    ))}
                  </ContentWrapper>
                  <AddContent>
                    <InputBox
                      type="text"
                      value={bingoTexts}
                      onChange={onChangeBingoTexts}
                      placeholder="달성한 빙고에 대해 이야기해주세요."
                    />
                    <img src={PlusSquare} style={{ width: '26px', height: '26px'}} onClick={bingoComplete} />
                  </AddContent>
                </ContentLists>
              </Content>
            </ClearWrapper>
            <ClearWrapper>
              <SubTitle>
                <img src={EmojiEmotion} style={{ width: '24px', height: '24px', paddingRight: '5px' }}></img>
                다른 성과 한 눈에 보기
              </SubTitle>
              <Content>
                <ContentLists>
                  <ContentWrapper>
                      {newOthersTexts.map((data) => (
                        <div key={data.id} style={{ display: 'flex'}}>
                          <img 
                            src={Minus} 
                            style={{ width: '16px', height: '16px', marginRight: '8px' }} 
                            onClick={() => delOthersComplete(data.id)} 
                          />
                          <ContentList>
                            <div>{data.content}</div>
                          </ContentList>
                        </div>
                      ))}
                    </ContentWrapper>
                  <AddContent>
                    <InputBox
                      type="text"
                      value={othersTexts}
                      onChange={onChangeOthersTexts}
                      placeholder="휴알유 이외의 성과에 대해 이야기해주세요."
                    />
                    <img src={PlusSquare} style={{ width: '26px', height: '26px' }} onClick={othersComplete} />
                  </AddContent>
                </ContentLists>
              </Content>
            </ClearWrapper>
          </HueWrapper>
        </AchievementWrapper>
        <ReviewWrapper style={{ float: 'bottom' }}>
          <Title>
            <SectionTitle><img src={MdOutlinedFeed} style={{ height: '21px', width: '19px' }}></img>내가 쓴 포스트 보기</SectionTitle>
            <CheckBox onClick={handleCheck}>
              {isChecked ? 
                <img src={checkimg} style={{ width: '24px', height: '24px', paddingRight: '10px' }}></img> :
                <img src={Vector} style={{ width: '24px', height: '24px', paddingRight: '10px' }}></img>}
              <p>빙고 인증 후기만 보기</p>
            </CheckBox>
          </Title>
          <ReviewContent>
            <ReviewGrid>
              {(isChecked ? certifiedReview : everyReview).slice(0, 8).map((review) => (
                <ReviewCard key={review.id} onClick={() => toReview(review.id)}>
                  <ImageWrapper>
                    {review.images.map((img) => (
                      <ReviewImage key={img.image_id}>
                        <img src={img.image} />
                      </ReviewImage>
                    ))}
                  </ImageWrapper>
                  <ReviewTitle>{review.title}</ReviewTitle>
                  <Likes>
                    <img src={heartimg} alt="likes" />
                    {review.likes.length}
                  </Likes>
                </ReviewCard>
              ))}
            </ReviewGrid>
          </ReviewContent>
        </ReviewWrapper>
      </Body>
      </>
  );
};

export default ChangePortfolio;

const Image = styled.div`
height: 128px;
 width: 128px;
  borderRadius: 50px;
`

const BackgroundWrapper = styled.div`
 background-image: linear-gradient(to bottom, rgba(30, 58, 138, 0.8), #FFFFFF);
 width: 100%;
 height: 280px; 
`;

const Body = styled.div`
  padding-left: 160px;
  padding-right: 160px;
`;

const ProfileImage = styled.div`
  padding-left: 160px;
  position: relative;
  bottom: 60px;
`;

const SaveBtn = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 10%;
  position: relative;
  bottom: 80px;
  button {
    background-color: white;
    width: 44px;
    height: 44px;
    border: 0.2px solid rgba(165, 176, 208, 1);
    border-radius: 8px;
    box-shadow: 1px 1px 3px 0px rgba(165, 176, 208, 1);
    cursor: pointer;
  }
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
  }
`;

const ProfileWrapper = styled.div`
  padding-bottom: 80px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
`;

const ProfileTitle = styled.div`
  padding-bottom: 30px;
  textarea {
    font-size: 16px;
    width: 98%;
    border: none;
    padding-left: 10px;
    resize: none;
    &::placeholder {
        color: #868686;
        font-family: 'Pretendard-Regular';
        font-size: 16px;
        font-weight: 400;
      }
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  color: #1E3A8A;
  font-size: 20px;
  font-weight: 600;
  img {
    margin-right: 10px;
  }
`;

const SubTitle = styled.div`
  color: rgba(196, 196, 196, 1);
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  height: 45px;
  border: 0.4px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
  }
  img {
    margin-right: 5px;
    margin-left: 8px;
  }
  span {
    display: flex;
    align-items: center;
    margin-left: 8px;
    font-size: 22px;
  }
`;

const Info = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const InfoItem = styled.div`
  display: flex;
  padding-bottom: 20px;
  input {
    display: flex;
    align-items: center;
    border: none;
    font-size: 15px;
    font-weight: 500;
    width: 20%;
    border: 0.2px solid rgba(30, 58, 138, 0.2);
    border-radius: 8px;
    text-indent: 10px;
    &::placeholder {
        color: #A3A3A3;
        font-family: 'Pretendard-Regular';
        font-size: 16px;
        font-weight: 700;
        padding: 4px 10px 4px 0px;
    }
  }
`;

const InfoLabel = styled.div`
  color: #1E3A8A;
  font-weight: 700;
  width: 200px;
  height: 35px;
  display: flex;
  align-items: center;
`;

const AchievementWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
  p {
    font-size: 16px;
    font-weight: 500;
    color: #868686;
  }
`;

const AboutMeWrapper = styled.div`
  padding-top: 10px;
  /* padding-bottom: 80px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2); */
`;

const Content = styled.div`
`;

const HueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ClearWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 49%;
`;

export const ReviewWrapper = styled.div`
  padding-top: 40px;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    color: #1E3A8A;
    border: none;
    &::placeholder{
      color: #1E3A8A;
    }
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  div {
    margin-bottom: 10px;
  }
`;

const ContentLists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  background: white;
  border-radius: 10px;
  padding: 10px;
`;

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  color: #747474;
  font-size: 14px;
  font-weight: 600;
`;

const AddContent = styled.div`
  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  padding: 0 12px;
  border-radius: 8px;
  border: 0.4px solid rgba(0, 0, 0, 0.2);
  height: 25px;
  width: 80%;
  margin-right: 10px;
  &::placeholder {
    font-size: 14px;
    font-weight: 700;
    color: #A3A3A3;
  }
`;

export const ReviewContent = styled.div`
  display: flex;
  padding: 30px 0px;
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  justify-content: space-between;
  width: 100%;
  height: 300px;
`;

export const ReviewCard = styled.div`
  padding: 0px 20px;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
`;

export const ImageWrapper = styled.div`
  padding-bottom: 20px;
`;
 
export const ReviewImage = styled.div`
  img {
    width: 100%;
    height: 250px; 
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const ReviewTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: rgba(30, 58, 138, 1);
  margin-bottom: 5px;
  margin-left: 10px; 
`;

export const Likes = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px; 
  img {
    width: 24px;
    height: 24px;
    margin-right: 3px;
  }
  color: rgba(116, 116, 116, 1);
  font-size: 14px;
`;