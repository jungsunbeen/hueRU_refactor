import React from 'react';
import styled from 'styled-components';
import { QuizDom, QuestionContainer, ButtonDom, Button } from './Test.jsx';
import ProgressBar from '../../components/typetest/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { answer2State } from '../../recoil/testatoms.jsx';
import textLogo from '../../images/Frame 8.png';

const Test1 = () => {
  const navigate = useNavigate();
  const [answer2, setAnswer2] = useRecoilState(answer2State);

  const handleNextClick = () => {
    if (!answer2) {
      alert("답변을 선택해주세요.");
    } else {
      setAnswer2(answer2);
      navigate("/test/2");
    }
  };

  const handleBeforeClick = () => {
    setAnswer2(answer2);
    navigate("/test/0");
  };

  const reasons = [
    "jobPreparation",
    "internship",
    "academicStress",
    "selfDevelopment",
    "diverseExperiences",
    "financialBurden",
    "mentalStability",
    "newCareerExploration"
  ];

  const toHome = () => {
    navigate('/');
  };

  return (
    <>
    <Header>
      <img src={textLogo} style={{ width: '200px', height: '40px', cursor: 'pointer' }} onClick={toHome}></img>
    </Header>
    <QuizDom>
      <ProgressBar currentStep={2} totalSteps={4} />
      <QuestionContainer>휴학을 선택한 계기는 무엇인가요?</QuestionContainer>
      <Answers>
        {reasons.map((reason, index) => (
          <Answer key={index} checked={answer2 === reason}>
            <label>
              <input
                type="radio" 
                name="reason" 
                value={reason} 
                checked={answer2 === reason}
                onChange={(e) => setAnswer2(e.target.value)}
              />
              {getReasonLabel(reason)}
            </label>
          </Answer>
        ))}
      </Answers>
      <ButtonDom>
        <Button onClick={handleBeforeClick}>이전</Button>
        <Button 
          style={{ backgroundColor: 'rgba(30, 58, 138, 1)', color:'white' }} 
          onClick={handleNextClick}
        >
          다음
        </Button>
      </ButtonDom>
    </QuizDom>
    </>
  );

  function getReasonLabel(reason) {
    switch (reason) {
      case "jobPreparation":
        return "취업 준비를 위해서";
      case "internship":
        return "인턴 근무를 위해서";
      case "academicStress":
        return "학업 스트레스를 완화하기 위해서";
      case "selfDevelopment":
        return "자기 계발을 위해서";
      case "diverseExperiences":
        return "다양한 경험을 위해서";
      case "financialBurden":
        return "경제적 부담 완화를 위해서";
      case "mentalStability":
        return "정서적 안정, 신체적 건강을 위해서";
      case "newCareerExploration":
        return "새로운 진로 탐색을 위해서";
      default:
        return "";
    }
  }
};

export default Test1;

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

const Answers = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  list-style: none;
  width: 590px;
  padding: 20px 31px 20px 10px;
  border-radius: 10px;
`;

const Answer = styled.li`
  display: flex;
  align-items: center;
  margin: 5px;
  width: 100%;
  height: 39px;
  padding: 0px 0px 0px 10px;
  border-radius: 20px;
  gap: 10px;
  background-color: ${props => props.checked ? 'rgba(56, 189, 248, 0.07)' : 'rgba(30, 58, 138, 0.04)'};
  border: ${props => props.checked ? '1.4px solid rgba(30, 58, 138, 0.6)' : 'none'};
  // box-shadow: ${props => props.checked ? '0px 3px 4px 0px rgba(30, 58, 138, 0.2);' : 'none'};
`;
