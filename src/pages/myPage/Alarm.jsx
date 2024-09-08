import React from 'react'
import styled from 'styled-components'
import HeaderHook from '../../components/HeaderHook'
import FooterHook from '../../components/FooterHook';
import AiOutlineSetting from '../../images/AiOutlineSetting.png'
import transimg from '../../images/transparent.png'
import { useNavigate } from 'react-router-dom'

const Alarm = () => {
  const router = useNavigate();

  const toSetting = () => {
    router('/alarmmanage')
  };


  return (
    <>
      <HeaderHook></HeaderHook>
      <Body>
        <TitleWrapper>
            <img src={transimg} />
            <SectionTitle>알림</SectionTitle>
            <img src={AiOutlineSetting} style={{width: '28px', height: '28px', cursor: 'pointer'}} onClick={toSetting}></img>
        </TitleWrapper>
        <AlarmWrapper>
          <div>
            <span>회원가입을 축하드립니다. 휴알유와 함께 알차고 유익한 휴학 생활을 시작해보세요!</span>
            <span style={{fontSize: '14px', fontWeight: '700', color: 'rgba(196, 196, 196, 1)'}}>2024.08.07</span>
          </div>
        </AlarmWrapper>
      </Body>
      <FooterHook />
    </>
  )
}

export default Alarm

const Body = styled.div`
  padding: 3% 25%;
  margin-bottom: 30%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5%;
`;

const SectionTitle = styled.div`
  color: #1E3A8A;
  font-size: 24px;
  font-weight: 700;
`;

const AlarmWrapper = styled.div`
  div {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
    height: 90px;
    border: 0.2px solid rgba(116, 116, 116, 0.3);
    border-radius: 10px;
    padding: 20px;
    gap: 50px;
    span {
      display: flex;
      align-items: center;
      font-size: 20px;
      font-weight: 600;
    }
  }
`;