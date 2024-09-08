import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import HeaderHook from '../../components/HeaderHook'
import FooterHook from '../../components/FooterHook'
import { useNavigate } from 'react-router-dom'
import { myInfo } from '../../apis/mypageapis'
import { getTypeTestResult } from '../../apis/viewResultapis'
import { getViewtype } from '../../apis/testapis';


const MyPage = () => {
  const [userInfo, setUserInfo] = useState({ name: '', username: '', type_result: '', email: ''});
  const [userType, setUserType] = useState('');
  const [userTypeDisplay, setUserTypeDisplay] = useState('');
  const premiumRef = useRef(null);
  const router = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await myInfo();
      // console.log(data);
      setUserInfo(data);
      setUserType(data.type_result);
      setUserTypeDisplay(data.type_result_display);
      // console.log(userType);
    };
    fetchUserInfo();
  }, [])

  const scrollToPremium = () => {
    if (premiumRef.current) {
      premiumRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSub = () => {
    alert('준비중입니다... 🐇🐇')
  };

  const toResult =() => {
    router(`/hueRU/${userType}`);
  }

  return (
    <>
        <HeaderHook></HeaderHook>
        <Body>
          <MyInfoWrapper>
            <InfoTitle>내 정보</InfoTitle>
            <Info>
              <InfoItem><InfoLabel>이름</InfoLabel><p>{userInfo.name}</p></InfoItem>
              <InfoItem><InfoLabel>닉네임</InfoLabel><p>{userInfo.username}</p></InfoItem>
              <InfoItem><InfoLabel>휴학 유형</InfoLabel><p>{userTypeDisplay}</p><button onClick={toResult}>유형 테스트 결과 보기</button></InfoItem>
              <InfoItem><InfoLabel>가입 이메일</InfoLabel><p>{userInfo.email}</p></InfoItem>
              <InfoItem><InfoLabel>요금제</InfoLabel><p>휴알유 basic</p><button style={{ width: '110px' }} onClick={scrollToPremium}>요금제 살펴보기</button></InfoItem>
              <InfoItem><InfoLabel>포인트</InfoLabel><p>1,000p</p></InfoItem>
            </Info>
          </MyInfoWrapper>
          <PremiumWrapper ref={premiumRef}>
            <PremTitle>휴알유 요금제</PremTitle>
            <PremGrade>
              <div style={{border: '1px solid rgba(116, 116, 116, 1)'}}>휴알유 basic</div>
              <div style={{border: '1px solid rgba(73, 95, 159, 1)', backgroundColor: 'rgba(153, 166, 202, 1)', color: 'white'}}>휴알유 plus</div>
              <div style={{backgroundColor: 'rgba(27, 52, 124, 1)', color: 'white'}}>휴알유 focus</div>
            </PremGrade>
            <PremContainer>
              <PremItem>-</PremItem>
              <PremItem>광고 제거</PremItem>
              <PremItem>광고 제거</PremItem>
              <PremItem>빙고 개수 1개</PremItem>
              <PremItem>빙고 개수 무제한</PremItem>
              <PremItem>빙고 개수 무제한</PremItem>
              <PremItem>빙고 수정 3회</PremItem>
              <PremItem>빙고 수정 5회</PremItem>
              <PremItem>빙고 수정 1회</PremItem>
              <PremItem>
                <ul>
                  <li>기한 마감</li>
                  <li style={{listStyleType: 'none'}}>7일 전 알림</li>
                </ul>
              </PremItem>
              <PremItem>
                <ul>
                  <li>기한 마감</li>
                  <li style={{listStyleType: 'none'}}>15/7/3일 전 알림</li>
                </ul>
              </PremItem>
              <PremItem>
                <ul>
                  <li>기한 마감</li>
                  <li style={{listStyleType: 'none'}}>15/7/3일 전 알림</li>
                  <li style={{listStyleType: 'none', color: 'white'}}>.</li>
                  <li>매일 이행 여부를<br />체크할 수 있는<br />데일리 빙고 체크리스트</li>
                  <li style={{listStyleType: 'none', color: 'white'}}>.</li>
                  <li>계획 이행률<br />시각화 자료 제공</li>
                  <li style={{listStyleType: 'none', color: 'white'}}>.</li>
                  <li>보증금 설정 가능</li>
                </ul>
              </PremItem>
              <PremItem style={{fontWeight: '700'}}>₩ 0</PremItem>
              <PremItemSpc style={{fontWeight: '700'}}>
                <span>₩ 5,000/3개월<br />₩ 15,000/년<br /><br /></span>
                <span style={{color: 'rgba(27, 52, 124, 1)'}} onClick={handleSub}>구독하기 &gt;</span> 
              </PremItemSpc>
              <PremItemSpc style={{fontWeight: '700'}}>
                <span>₩ 6,000/3개월<br />₩ 18,000/년<br /><br /></span>
                <span style={{color: 'rgba(27, 52, 124, 1)'}} onClick={handleSub}>구독하기 &gt;</span> 
              </PremItemSpc>
            </PremContainer>
          </PremiumWrapper>
        </Body>
        <FooterHook />
    </>
  )
};

export default MyPage

const Body = styled.div`
  padding-top: 100px;
  padding-left: 400px;
  padding-right: 400px;
  margin-bottom: 20%;
`;

const MyInfoWrapper = styled.div`
  padding-bottom: 50%;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
`;

const InfoTitle = styled.div`
  color: #1E3A8A;
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 50px;
`;

const Info = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  input {
    width: 200px;
    height: 60px;
    border: none;
    &::placeholder {
      font-size: 20px;
      font-weight: 700;
      color: #515151;
    }
  }
  img {
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
  }
  button {
    background-color: #8E9CC4;
    color: white;
    height: 30px;
    border: none;
    border-radius: 10px;
    padding: 4px 10px 4px 10px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  p {
    padding-right: 40px;
  }
`;

const InfoLabel = styled.div`
  color: #1E3A8A;
  width: 230px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const PremiumWrapper = styled.div`
  padding-bottom: 150px;
`;

const PremTitle = styled.div`
  display: flex;
  align-items: center;
  color: #1E3A8A;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const PremGrade = styled.div`
  width: 88%;
  display: flex;
  justify-content: space-between;
  padding: 100px 50px 50px 50px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 60px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
  } 
`;

const PremContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, minmax(150px, auto));
  gap: 10px;
`;

const PremItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #A3A3A3;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #515151;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    list-style-type: disc;
    padding-left: 20px;
    text-align: left;
  }
`;

const PremItemSpc = styled.div`
  padding: 10px;
  border-bottom: 1px solid #A3A3A3;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #515151;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`