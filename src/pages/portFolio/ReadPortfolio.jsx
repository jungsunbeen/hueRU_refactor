import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HeaderHook from '../../components/HeaderHook'
import AiOutlineRocket from '../../images/AiOutlineRocket.png'
import FiNavigation from '../../images/FiNavigation.png'
import AiOutLineBank from '../../images/AiOutlineBank.png'
import MdOutlinedFeed from '../../images/MdOutlineFeed.png'
import Vector from '../../images/Vector.png'
import { useNavigate } from 'react-router-dom'
import editimg from '../../images/FiEdit3.png'
import checkimg from '../../images/AiOutlineCheckSquare.png'
import { getCertifiedReview, getData, getReview } from '../../apis/portFolioapis'
import FiCheck from '../../images/FiCheck.png';
import heartimg from '../../images/AiOutlineHeartRed.png';
import { ReviewWrapper, Title, ReviewContent, ReviewGrid, ReviewCard, ImageWrapper, ReviewImage, ReviewTitle, Likes } from './ChangePortfolio'

const ReadPortfolio = () => {
  const [newAboutMeTexts, setNewAboutMeTexts] = useState(['']); //get용
  const [newBingoTexts, setNewBingoTexts] = useState(['']);
  const [newOthersTexts, setNewOthersTexts] = useState(['']);
  const [basicInfo, setBasicInfo] = useState('');
  const [username, setUsername] = useState('');
  const [everyReview, setEveryReview] = useState([]);
  const [certifiedReview, setCertifiedReview] = useState([]);
  const [image, setImage] = useState('');

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
        // console.log(response);
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

  const toChangeMode = () => {
    router('/changeportfolio');
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  
  const toReview = (id) => {
    router(`/viewreview/${id}`)
  };


  return (
    <>
    <HeaderHook></HeaderHook>
    <BackgroundWrapper></BackgroundWrapper>
    <ProfileImage>
      <img src={image} style={{ height: '128px', width: '128px', borderRadius: '50%'}}></img>
    </ProfileImage>
    <ChangeBtn>
      <button onClick={toChangeMode}><img src={editimg}></img></button>
    </ChangeBtn>
    <Body>
      <ProfileWrapper>
        <ProfileTitle>
          <SectionTitle style={{ position: 'relative', bottom: '10px' }}>{username}, who are you?</SectionTitle>
          <Keyword>{basicInfo.modifier}</Keyword>
        </ProfileTitle>
        <Info>
          <InfoItem><InfoLabel>생년월일</InfoLabel>{basicInfo.birth}</InfoItem>
          <InfoItem><InfoLabel>학교 & 전공</InfoLabel>{basicInfo.school_major}</InfoItem>
          <InfoItem><InfoLabel>연락처</InfoLabel>{basicInfo.phone_number}</InfoItem>
          <InfoItem><InfoLabel>E-mail</InfoLabel>{basicInfo.email}</InfoItem>
        </Info>
        </ProfileWrapper>
        <AchievementWrapper>
          <SectionTitle style={{marginBottom: '30px'}}>{username}님의 휴 are you</SectionTitle>
          <AboutMeWrapper>
            <SubTitle style={{backgroundColor: '#7485B5'}}>
              <img src={AiOutlineRocket} style={{ height: '22px', width: '22px'}}></img>
              저는 이런 사람입니다
              </SubTitle>
            <Content>
              <ContentWrapper>
                {newAboutMeTexts.map((data) => (
                  <div key={data.id} style={{ display: 'flex'}}>
                    <img src={FiCheck} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    <ContentList>
                      <div>{data.content}</div>
                    </ContentList>
                  </div>
                ))}
              </ContentWrapper>
            </Content>
          </AboutMeWrapper>
          <HueWrapper>
            <ClearWrapper>
              <SubTitle style={{backgroundColor: '#A5B0D0'}}><img src={FiNavigation} style={{ height: '21px', width: '21px' }}></img>달성한 빙고 한 눈에 보기</SubTitle>
              <Content>
                 <ContentWrapper>
                    {newBingoTexts.map((data) => (
                      <div key={data.id} style={{ display: 'flex'}}>
                        <img src={FiCheck} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        <ContentList>
                          <div>{data.content}</div>
                        </ContentList>
                      </div>
                    ))}
                  </ContentWrapper>
              </Content>
            </ClearWrapper>
            <ClearWrapper>
              <SubTitle style={{backgroundColor: '#D2D8E8'}}><img src={AiOutLineBank} style={{ height: '21px', width: '19px' }}></img>다른 성과 한 눈에 보기</SubTitle>
              <Content>
                <ContentWrapper>
                  {newOthersTexts.map((data) => (
                    <div key={data.id} style={{ display: 'flex'}}>
                      <img src={FiCheck} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                      <ContentList>
                        <div>{data.content}</div>
                      </ContentList>
                    </div>
                  ))}
                </ContentWrapper>
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
  )
}

export default ReadPortfolio

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

const ChangeBtn = styled.div`
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

const Keyword = styled.div`
  padding-bottom: 50px;
`;

const SubTitle = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    margin-right: 10px;
    margin-left: 20px;
  }
`;

const Info = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const InfoItem = styled.div`
  display: flex;
  padding-bottom: 20px;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  background: white;
  border-radius: 10px;
  padding: 10px;
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
  /* padding-bottom: 80px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2); */
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

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  color: #747474;
  font-size: 16px;
  font-weight: 700;
`;