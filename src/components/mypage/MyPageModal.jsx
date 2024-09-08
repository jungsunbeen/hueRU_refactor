import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import moneyimg from '../../images/MdOutlineCopyright.png'

const MyPageModal = ({ isOpen }) => {
  const router = useNavigate();

  const toMyPage = () => {
    router('/myPage');
  };

  const toAlarm = () => {
    router('/alarm');
  };

  if (!isOpen) return null;
  return (
    <>
    <ModalWrapper>
      <ModalBtn>
        <img src={moneyimg} style={{width: '20px', height: '20px', marginRight: '5px'}}></img>
        <span>1,000P</span>
      </ModalBtn>
      <ModalBtn>
        <StyledButton onClick={toMyPage}>내 정보</StyledButton>
      </ModalBtn>
      <ModalBtn>
        <StyledButton onClick={toAlarm}>알림</StyledButton>
      </ModalBtn>
    </ModalWrapper>
    </>
  )
}

export default MyPageModal

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  right: 3%;
  top: 12%;
  width: 145px;
  height: 140px;
  border: 0.4px solid rgba(196, 196, 196, 1);
  background-color: white;
`;

const ModalBtn = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  width: 78%;
  height: 26px;
  cursor: pointer;
`;