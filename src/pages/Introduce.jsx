import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LogoutBtn, Headers, Logo, Nav, Header, Mypage, Modal } from '../components/HeaderHook'
import MyPageModal from '../components/mypage/MyPageModal'
import modalopenimg from '../images/modalopen.png'
import modalcloseimg from '../images/modalclose.png'
import { Link, useNavigate } from 'react-router-dom'
import TermsModal from '../components/login/TermsModal'
import hueimg from '../images/HueRU.png'
import bearimg from '../images/bearimg.png'
import test from '../images/test.png'
import reco from '../images/reco.png'
import bingo from '../images/bingo.png'
import noti from '../images/noti.png'
import pofol from '../images/pofol.png'
import logo from '../images/Logoimg.png'


const Introduce = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAccessToken = localStorage.getItem("access_token");
    if (savedAccessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleBtn = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMyBtn = () => {
    setIsMyModalOpen(!isMyModalOpen);
  };
  
  
  const handleLogout = () => {
    if (localStorage.getItem("access_token") && localStorage.getItem("refresh_token")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.reload();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
    <HeaderofHome>
      <LogoutBtn>
        { isLoggedIn ? 
          <button onClick={handleLogout}>로그아웃</button> :
          <SignupLink>
            <StyledLink to="/signup" style={{color: 'rgba(27, 52, 124, 1)'}}>회원가입</StyledLink>
            <span style={{color: 'rgba(196, 196, 196, 1)'}}>|</span>
            <StyledLink to="/login" style={{color: 'rgba(81, 81, 81, 1)'}}>로그인</StyledLink>
          </SignupLink>
        }
      </LogoutBtn>
      <Headers>
        <Logo to ="/">
          <img src={logo}></img>
        </Logo>
        <Nav>
          { isLoggedIn ?
          <>
            <Header to="/test/0">휴학 유형 테스트</Header>
            <Header to="/view">투두리스트 빙고</Header>
            <Header to="/notification">공고/후기</Header>
            <Header to="/readportfolio">나의 포트폴리오</Header>
            <Mypage>
              <Header to="/mypage">마이페이지</Header>
              <Modal onClick={handleMyBtn}>
                { isMyModalOpen ?
                  <img src={modalopenimg}></img> :
                  <img src={modalcloseimg}></img> }
              </Modal>
            </Mypage> 
          </> :
          <>
            <Header to="/test/0">휴학 유형 테스트</Header>
            <Header to="/notification">공고/후기</Header>
          </> }
        </Nav>
      </Headers>
      <MyPageModal isOpen={isMyModalOpen}></MyPageModal>
    </HeaderofHome>
    <Body>
      <HueRuWrapper>
        <HueText>
          <div style={{fontSize: '32px'}}>휴학을 알차고 유익하게</div>
          <div style={{fontSize: '50px', fontWeight: '800'}}>휴알유</div>
          <div style={{fontSize: '20px', color: 'rgba(116, 116, 116, 1)'}}>휴학, 나의 시간을 가치있는 성과로 만들어보세요!</div>
        </HueText>
        <HueImg>
          <img src={hueimg}></img>
        </HueImg>
      </HueRuWrapper>
      <TestWrapper>
        <TestText>
          <div style={{fontSize: '16px'}}>휴학을 결심한 이유와 목표가 불확실하다면?</div>
          <div style={{fontSize: '32px'}}>휴학 유형 테스트</div>
          <div style={{fontSize: '14px', color: 'rgba(116, 116, 116, 1)', paddingTop: '10px'}}>휴학 유형 테스트를 통해 나의 방향을 찾으세요!<br />
          간단한 질문과 캐릭터를 통한 해석을 통해 목표를 정확하게 정의하고 여정을 준비할 수 있습니다.</div>
        </TestText>
        <TestImg>
          <img src={bearimg}></img>
        </TestImg>
        <TestBox>
          <img src={test}></img>
        </TestBox>
      </TestWrapper>
      <RecoWrapper>
        <RecoImg>
          <img src={reco}></img>
        </RecoImg>
        <RecoText>
          <div style={{fontSize: '16px'}}>휴학 중, 무엇을 해야할지 모르겠다면?</div>
          <div style={{fontSize: '32px'}}>유형별 투두리스트 추천</div>
          <div style={{fontSize: '14px', color: 'rgba(116, 116, 116, 1)', paddingTop: '10px'}}>
            유형별로 추천되는 활동 리스트를 통해 성향에 맞는 휴학 계획을 손쉽게 세워보세요.</div>
        </RecoText>
      </RecoWrapper>
      <BingoWrapper>
        <BingoText>
          <div style={{fontSize: '16px'}}>간편하고 확실한 우선순위 확립을 원한다면?</div>
          <div style={{fontSize: '32px'}}>투두리스트 빙고</div>
          <div style={{fontSize: '14px', color: 'rgba(116, 116, 116, 1)', paddingTop: '10px'}}>
          빙고 칸을 자유롭게 배열하며 다양한 활동 간의 우선순위를 고민해보세요.<br />
          목표를 달성하는 재미와 함께, 의미 있는 휴학 기간을 만들어갈 수 있습니다.</div>
        </BingoText>
        <BingoImg>
          <img src={bingo}></img>
        </BingoImg>
      </BingoWrapper> 
      <NotiWrapper>
        <NotiImg>
          <img src={noti}></img>
        </NotiImg>
        <NotiText>
          <div style={{fontSize: '16px'}}>더 많은 정보와 경험자들의 팁이 필요하다면?</div>
          <div style={{fontSize: '32px'}}>공고/후기</div>
          <div style={{fontSize: '14px', color: 'rgba(116, 116, 116, 1)', paddingTop: '10px'}}>
          구체적인 공고를 확인하고 다른 휴학생들과 경험을 나눠보세요.<br />
          실천 가능한 계획 수립에 도움을 받고 소중한 인사이트를 얻을 수 있습니다.</div>
        </NotiText>
      </NotiWrapper>
      <PofolWrapper>
        <PofolText>
          <div style={{fontSize: '16px'}}>과정부터 마무리까지 확실히 하고 싶다면?</div>
          <div style={{fontSize: '32px'}}>휴학 포트폴리오</div>
          <div style={{fontSize: '14px', color: 'rgba(116, 116, 116, 1)', paddingTop: '10px'}}>
          휴학 기간 이룬 성과를 기록하며 나의 시간을 정리해보세요.<br />
          나만의 경험과 성장의 모습을 담은 포트폴리오를 채우며 지난 시간을 돌아보고 앞으로를 계획해보세요.</div>
        </PofolText>
        <PofolImg>
          <img src={pofol}></img>
        </PofolImg>
      </PofolWrapper>
    </Body>
    <Fotter>
        <MainWrapper>
          <FooterNav>
            <Pages>
              <FooterHeader>메인 홈</FooterHeader>
              <FooterHeader>휴학 유형 테스트</FooterHeader>
              <FooterHeader>투두리스트 빙고</FooterHeader>
              <FooterHeader>공고/후기</FooterHeader>
              <FooterHeader>휴학 포트폴리오</FooterHeader>
            </Pages>
            <Term>
              <StyledBtn onClick={handleBtn}>이용약관</StyledBtn>
              <TermsModal isOpen={isModalOpen} onCancel={handleCancel}></TermsModal>
            </Term>
          </FooterNav>
          <Email>
            contact us | hueareyou@gmail.com
          </Email>
        </MainWrapper>
        <UsWrapper>
          (C) 2024 Project 막내가좋아 Corp.
        </UsWrapper>
      </Fotter>
  </>
  )
}

export default Introduce

const HeaderofHome = styled.div`
`;

const SignupLink = styled(Link)`
  display: flex;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Body = styled.div`
  margin-bottom: 10%; 
`;

const HueRuWrapper = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;  
`;

const HueText = styled.div`
  color: rgba(27, 52, 124, 1);
  font-weight: 700;
  padding-right: 5%;
  div {
    margin-top: 20px;
  }
`;

const HueImg = styled.div`
  padding-bottom: 10%;
  img{
    width: 320px;
    height: 320px;
  }
`;

const TestWrapper  = styled.div`
  background-color: rgba(233, 236, 244, 1);
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TestText = styled.div`
  padding-right: 30%;
  padding-top: 10%;
  color: rgba(27, 52, 124, 1);
  font-weight: 800;
  div {
    margin-top: 10px;
  }
`;

const TestImg = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 40%;
  bottom: 10%;
  img {
    width: 340px;
    height: 260px;
  }
`;

const TestBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  bottom: 8%;  
  padding-left: 10%;
  img {
    width: 800px;
    height: 200px;
  }
`;

const RecoWrapper = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecoImg = styled.div`
  padding-right: 5%;
  img {
    width: 440px;
    height: 480px;
  }
`;

const RecoText = styled.div`
  color: rgba(27, 52, 124, 1);
  font-weight: 800;
  padding-bottom: 15%;
  padding-left: 2%;
  div {
    margin-top: 10px;
  }
`;

const BingoWrapper  = styled.div`
  background-color: rgba(233, 236, 244, 1);
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BingoText = styled.div`
  color: rgba(27, 52, 124, 1);
  font-weight: 800;
  padding-bottom: 20%;
  div {
    margin-top: 10px;
  }
`;

const BingoImg = styled.div`
  padding-left: 5%;
  img {
    width: 440px;
    height: 480px;
  }
`;

const NotiWrapper  = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotiText = styled.div`
  color: rgba(27, 52, 124, 1);
  font-weight: 800;
  padding-left: 5%;
  padding-bottom: 12%;
  div {
    margin-top: 10px;
  }
`;

const NotiImg = styled.div`
  padding-top: 5%;
  img {
    width: 575px;
    height: 370px;
  }
`;

const PofolWrapper = styled.div`
  background-color: rgba(233, 236, 244, 1);
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PofolText = styled.div`
  color: rgba(27, 52, 124, 1);
  font-weight: 800;
  div {
    margin-top: 10px;
  }
`;

const PofolImg = styled.div`
  padding-left: 5%;
  img {
    width: 480px;
    height: 560px;
  }
`;

const Fotter = styled.div`
  background-color: rgba(27, 52, 124, 1);
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  font-weight: 500;
  color: white;
  padding: 3% 5%;
  
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FooterNav = styled.div`
  display: flex;
`;

const Pages = styled.div`
  margin-right: 100px;
`;

const FooterHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-decoration: none;
  color: white;
`;

const Term = styled.div`
`;

const StyledBtn = styled.div`
  cursor: pointer;
`;

const Email = styled.div`

`;

const UsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;