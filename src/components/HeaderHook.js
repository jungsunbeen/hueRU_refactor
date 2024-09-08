import React, { useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import MyPageModal from "./mypage/MyPageModal";
import modalopenimg from "../images/modalopen.png";
import modalcloseimg from "../images/modalclose.png";
import logoimg from "../images/Logoimg.png";

const HeaderHook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useNavigate();

  const handleBtn = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = ()=>{
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    router('/');
    // window.location.reload();
  };

  return (
    <>
    <LogoutBtn>
      <button onClick={handleLogout}>로그아웃</button>
    </LogoutBtn>
    <Headers>
      <Logo to ="/">
        <img src={logoimg}></img>
      </Logo>
      <Nav>
        <Header to="/test/0">휴학 유형 테스트</Header>
        <Header to="/view">투두리스트 빙고</Header>
        <Header to="/notification">공고/후기</Header>
        <Header to="/readportfolio">나의 포트폴리오</Header>
        <Mypage>
          <Header to="/mypage">마이페이지</Header>
          <Modal onClick={handleBtn}>
            { isModalOpen ?
              <img src={modalopenimg}></img> :
              <img src={modalcloseimg}></img> }
          </Modal>
        </Mypage>
      </Nav>
    </Headers>
    <MyPageModal isOpen={isModalOpen}></MyPageModal>
    </>
  )
}

export default HeaderHook;

export const LogoutBtn = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 3%;
  margin-top: 1%;
  button {
    height: 24px;
    padding: 4px 10px 4px 10px;
    gap: 10px;
    border: 0.4px solid rgba(217, 217, 217, 1);
    background-color: white;
    font-size: 13px;
    font-weight: 500;
    color: rgba(81, 81, 81, 1);
  }
`;

export const Headers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right : 3rem;
  gap : 20px;
  height : 64px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  font-size : 20px;
  color : rgba(30, 58, 138, 1);
`;

export const Header = styled(Link)`
  color: rgba(81, 81, 81, 1);
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
`;

export const Logo = styled(Link)`
  img {
    width: 40px;
    height: 40px;
    margin-left: 100%;
  }
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 18px;
`;

export const Mypage = styled.div`
  display: flex;
  align-items: center;
`;

export const Modal = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
`;