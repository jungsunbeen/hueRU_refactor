import React, { useState } from 'react'
import styled from 'styled-components'
import TermsModal from './login/TermsModal'

const FooterHook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBtn = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Fotter>
        <MainWrapper>
          <Nav>
            <Pages>
              <Header>메인 홈</Header>
              <Header>휴학 유형 테스트</Header>
              <Header>투두리스트 빙고</Header>
              <Header>공고/후기</Header>
              <Header>휴학 포트폴리오</Header>
            </Pages>
            <Term>
              <StyledBtn onClick={handleBtn}>이용약관</StyledBtn>
              <TermsModal isOpen={isModalOpen} onCancel={handleCancel}></TermsModal>
            </Term>
          </Nav>
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

export default FooterHook

const Fotter = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-size: 16px;
  font-weight: 500;
  color: rgba(81, 81, 81, 1);
  padding: 5%;
  
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.div`
  display: flex;
`;

const Pages = styled.div`
  margin-right: 100px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  text-decoration: none;
  color: rgba(81, 81, 81, 1);
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