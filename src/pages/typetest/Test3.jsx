import React from 'react';
import styled from 'styled-components';
import { QuizDom, QuestionContainer, ButtonDom, ButtonLink } from './Test.jsx';
import ProgressBar from '../../components/typetest/ProgressBar';
import { FiArrowRightCircle } from 'react-icons/fi';
import { useNavigate} from 'react-router-dom';
import { answer4State } from '../../recoil/testatoms.jsx';
import { useRecoilState } from 'recoil';
import textLogo from '../../images/Frame 8.png';

const Test3 = ({inputValue, setInputValue}) => {
  const navigate = useNavigate();
  const [answer4, setAnswer4] = useRecoilState(answer4State);

  const showResult = () => {
    setAnswer4(inputValue);
    navigate('/result');
    // console.log(inputValue);
  }

  const toHome = () => {
    navigate('/');
  };

  return (
    <>
    <Header>
          <img src={textLogo} style={{ width: '200px', height: '40px', cursor: 'pointer' }} onClick={toHome}></img>
    </Header>
    <QuizDom>
      <ProgressBar currentStep={4} totalSteps={4} />
      <QuestionContainer>이 기간이 나에게 어떤 기억으로 남길 바라나요?</QuestionContainer>
      <Input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="내용을 적어주세요." 
      />
      <ButtonDom>
        <ButtonLink style={{width:'160px'}}to="/test/2">이전</ButtonLink>
        <ButtonLink style={{ backgroundColor: 'rgba(30, 58, 138, 1)', color:'white', width:'400px' }} to="/result" onClick={showResult}>
        <FiArrowRightCircle /> 나의 휴학 유형 보러가기
        </ButtonLink>
      </ButtonDom>
    </QuizDom>
    </>
  );
};

export default Test3;

const Header = styled.div`
  width: 100%;
  height: 11vh;
  border-bottom: 1.5px solid #d9d9d9;
  background-color: #1E3A8A;
  text-align: center;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Input = styled.input`
  width: 570px;
  height: 80px;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
  border: 0px solid white;
  background: rgba(30, 58, 138, 0.04);
  font-size: 16px;
`;
