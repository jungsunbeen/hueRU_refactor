import React, { useState } from 'react'
import styled from 'styled-components'
import HeaderHook from '../../components/HeaderHook'
import FooterHook from '../../components/FooterHook';
import transimg from '../../images/transparent.png'
import backimg from '../../images/MdOutlineKeyboardBackspace.png'
import heartimg from '../../images/AiOutlineHeart.png'
import msgimg from '../../images/AiOutlineMessage.png'
import dollarimg from '../../images/AiOutlineDollar.png'
import fileimg from '../../images/AiOutlineFileText.png'
import onSwitch from '../../images/OnSwitch.png'
import offSwitch from '../../images/Switch.png'
import { useNavigate } from 'react-router-dom'

const AlarmManage = () => {
  const router = useNavigate();
  const [switchStates, setSwitchStates] = useState({
    heart: true,
    comment: true,
    point: true,
    post: true
  });

  const toAlarm= () => {
    router('/alarm')
  };

  const handleBtn = (type) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [type]: !prevState[type]
    }));
  };

  return (
    <>
      <HeaderHook></HeaderHook>
      <Body>
        <TitleWrapper>
          <img src={backimg} style={{width: '32px', height: '32px', cursor: 'pointer'}} onClick={toAlarm}></img>
          <SectionTitle>알림 설정</SectionTitle>
          <img src={transimg} />
        </TitleWrapper>
        <ControlWrapper>
          <ControlItem>
            <ControlLabel><img src={heartimg}></img>공감 알림</ControlLabel>
            <ControlBtn onClick={() => handleBtn('heart')}>
              {switchStates.heart ? <img src={onSwitch}></img> : <img src={offSwitch}></img>}
            </ControlBtn>
          </ControlItem>
          <ControlItem>
            <ControlLabel><img src={msgimg}></img>새 댓글 알림</ControlLabel> 
            <ControlBtn onClick={() => handleBtn('comment')}>
              {switchStates.comment ? <img src={onSwitch}></img> : <img src={offSwitch}></img>}
            </ControlBtn>
          </ControlItem>
          <ControlItem>
            <ControlLabel><img src={dollarimg}></img>포인트 적립 알림</ControlLabel>
            <ControlBtn onClick={() => handleBtn('point')}>
              {switchStates.point ? <img src={onSwitch}></img> : <img src={offSwitch}></img>}
            </ControlBtn>
          </ControlItem>
          <ControlItem>
            <ControlLabel><img src={fileimg}></img>휴알유 포스트 알림</ControlLabel>
            <ControlBtn onClick={() => handleBtn('post')}>
              {switchStates.post ? <img src={onSwitch}></img> : <img src={offSwitch}></img>}
            </ControlBtn>
          </ControlItem>
        </ControlWrapper>
      </Body>
      <FooterHook />
    </>
  )
}

export default AlarmManage

const Body = styled.div`
  padding: 3% 25%;
  margin-bottom: 30%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 60px;
`;

const SectionTitle = styled.div`
  color: #1E3A8A;
  font-size: 24px;
  font-weight: 700;
`;

const ControlWrapper = styled.div`
  width: 80%;
  padding: 0 10% 0 15%;
`;

const ControlItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 550px;
  height: 64px;
  border-radius: 20px;
  border: 0.2px solid rgba(0, 0, 0, 0.2);
  color: #1E3A8A;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 7%;
`;

const ControlLabel = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  img {
      width: 24px;
      height: 24px;
      padding: 0 6%;
    }
`;

const ControlBtn = styled.div`
  display: flex;
  align-items: center;
  img{
    width: 40px;
    height: 24px;
    padding-right: 15px;
  } 
`;