import React from 'react'
import styled from 'styled-components';

const TermsModal = ({ isOpen, onCancel }) => {
  if (!isOpen) return null;

  return (
    <>
    <ModalWrapper>
      <Body>
        <p>
        [휴알유 이용약관]<br></br><br></br>

        제 1 조 (목적)<br></br>

        이 약관은 휴알유(이하 "서비스"라 한다)를 이용함에 있어 사용자와 서비스 제공자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규명함을 목적으로 합니다.<br></br><br></br>

        제2조(약관의 게시와 개정)<br></br>

          <Intent>1. 서비스 제공자는 이 약관의 내용을 사용자가 쉽게 알 수 있도록 휴알유 회원가입 과정 및 메인 페이지 하단에 이를 게시합니다.<br></br></Intent>
          <Intent>2. 서비스 제공자는 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br></br></Intent>
          <Intent>3. 서비스 제공자가 약관을 개정할 경우에는 적용 일자 및 개정사유를 명시하여 그 개정약관의 적용일자 14일 전부터 적용일자 전일까지 공지합니다.
          다만 사용자에게 불리한 약관 개정의 경우에는 30일 전부터 서비스 내 공지를 통해 명확히 통지하도록 합니다.<br></br><br></br></Intent> 

        제3조 (이용자의 자격)<br></br>

        서비스는 만 14세 이상의 사용자만 이용할 수 있습니다. 이용자는 서비스 이용 시 정확한 정보를 제공해야 하며, 허위 정보를 입력할 경우 서비스 이용이 제한될 수 있습니다.<br></br><br></br>

        제4조 (회원 가입)<br></br>

        서비스 이용을 위해 회원 가입을 해야 하며, 회원 가입 시 이름, 이메일 주소, 아이디, 비밀번호 등의 정보를 입력해야 합니다. <br></br>
        회원은 자신의 계정 정보를 안전하게 관리할 책임이 있습니다.<br></br><br></br>

        제5조 (서비스의 내용)<br></br>

        <Intent>1. 회원에게 아래와 같은 서비스를 제공합니다.<br></br></Intent>
          <SubIntent>- 휴학 목표 유형화 서비스<br></br></SubIntent>
          <SubIntent>- 휴학 후 활동 추천 서비스<br></br></SubIntent>
          <SubIntent>- 휴학 계획 기록 서비스<br></br></SubIntent>
          <SubIntent>- 공고 검색 서비스<br></br></SubIntent>
          <SubIntent>- 후기글 열람 서비스<br></br></SubIntent>
          <SubIntent>- 포트폴리오 기록 서비스<br></br></SubIntent>
          <SubIntent>- 목표 달성 지원<br></br></SubIntent>
        <Intent>2. 기타 회사가 추가로 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스를 제공합니다.<br></br></Intent>
        <Intent>3. 서비스의 내용, 형태, 기능, 디자인 등은 필요한 경우 수시로 변경 또는 중단될 수 있습니다.<br></br></Intent>
        <Intent>4. 서비스 제공자는 서비스 운영과 관련하여 회원정보, 고객이 입력한 정보를 활용하여 광고를 게재할 수 있습니다.
        회원은 서비스 이용 시 노출되는 맞춤 광고 게재에 대해 동의합니다.<br></br><br></br></Intent>

        제6조 (이용자의 의무)<br></br>

        <Intent>1. 이용자는 서비스 이용 시 법적 규제 및 타인 권리 침해 금지 등의 규정을 준수해야 합니다.<br></br></Intent>
        <Intent>2. 이용자는 서비스 내에서 발생한 모든 활동에 대해 책임을 집니다.<br></br></Intent>
        <Intent>3. 이용자는 다음 행위를 하여서는 안 됩니다.<br></br></Intent>
        <SubIntent>a. 허위 내용의 등록<br></br></SubIntent>
        <SubIntent>b. 타인의 정보 도용<br></br></SubIntent>
        <SubIntent>c. 다른 이용자의 개인정보 및 계정정보를 수집하는 행위<br></br></SubIntent>
        <SubIntent>d. 서비스 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위<br></br></SubIntent>
        <SubIntent>e. 외설 또는 폭력적인 메시지를 게시하는 행위<br></br></SubIntent>
        <SubIntent>f. 기타 불법적이거나 부당한 행위<br></br><br></br></SubIntent>

        제7조 (개인정보 보호)<br></br>

        <Intent>1. 서비스는 이용자의 개인정보를 개인정보 처리 방침에 따라 보호합니다.<br></br></Intent>
        <Intent>2. 이용자는 자신의 개인정보와 관련한 권리를 행사할 수 있으며, 서비스는 이를 존중합니다.<br></br></Intent>
        <Intent>3. 서비스 제공자는 회원의 별도 동의 없이 회원의 계정 정보를 포함한 일체의 개인정보를 제3자에게 공개하거나 제공하지 아니합니다.<br></br><br></br></Intent>

        제8조 (서비스 변경 및 종료)<br></br>

        <Intent>1. 서비스 제공자는 운영상의 필요에 따라 사전 통지 후 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.<br></br></Intent>
        <Intent>2. 서비스 종료 시 서비스 내 공지 알림, 로그인 후 알림 등을 통해 사전에 이용자에게 통지합니다.<br></br><br></br></Intent>

        제9조 (캐시 적립 및 이용)<br></br>

        <Intent>1. 서비스 제공자는 사용자에게 캐시를 적립할 수 있으며, 적립 경로는 다음과 같습니다.<br></br></Intent>
        <SubIntent>a. 기록한 목표를 모두 수행하고 인증 후기 글을 “공개”로 작성한 경우<br></br></SubIntent>
        <SubIntent>b. 빙고판에 작성하지 않았던 활동에 대해 작성한 후기 글이 서비스 제공자의 승인을 통과하여 서비스에 게시된 경우<br></br></SubIntent>
        <SubIntent>c. 추천인의 링크를 통해 설치하여 회원 가입을 한 경우<br></br></SubIntent>
        <SubIntent>d. 그 외 서비스 제공자가 정한 방식<br></br></SubIntent>
        <Intent>2. 적립된 캐시 내역은 서비스 내 마이페이지 화면에서 확인하실 수 있습니다.<br></br></Intent>
        <Intent>3. 사용자는 적립된 캐시를 이용하여 서비스 내 제휴된 컨텐츠를 이용, 구매할 수 있습니다.<br></br><br></br></Intent>

        제10조 (계약 해제, 해지 등)<br></br>

        <Intent>1. 사용자는 언제든지 서비스 내 "회원탈퇴" 화면을 통하여 이용계약 해지 신청을 할 수 있으며, 서비스 제공자는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.<br></br></Intent>
        <Intent>2. 사용자가 계약을 해지할 경우, 관련법 및 개인정보처리방침에 따라 서비스 제공자가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터는 소멸됩니다.<br></br><br></br></Intent>

        이 약관은 2024.08.06 부터 적용됩니다.
        </p>
        <ModalBtn>
          <btn onClick={onCancel}>닫기</btn>
        </ModalBtn>
      </Body>
    </ModalWrapper>
    </>
  )
}

export default TermsModal

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.4);
`;

const Body = styled.div`
  background-color: white;
  padding: 50px 100px 20px 100px;
  max-width: 60%;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh; 
  color: #515151;
  font-size: 16px;
  font-weight: 500;
`;

const ModalBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 95%;
  width: 35px;
  height: 20px;
  border-radius: 4px;
  padding: 4px 10px 4px 10px;
  background-color: #D9D9D9;
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

const Intent = styled.div`
  text-indent: 10px;
`;

const SubIntent = styled.div`
  text-indent: 20px;
`;