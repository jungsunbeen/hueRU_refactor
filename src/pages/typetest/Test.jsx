import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import YearSemesterSelector from '../../components/typetest/YearSemesterSelector';
import ProgressBar from '../../components/typetest/ProgressBar';
import { useRecoilState } from 'recoil';
import { semesterState, yearState } from '../../recoil/testatoms';
import textLogo from '../../images/Frame 8.png';

const Test = () => {
    const navigate = useNavigate();
    const [year,setYear] = useRecoilState(yearState);
    const [semester,setSemester] = useRecoilState(semesterState);
    
    const handleYearSemesterChange = (newYear, newSemester) => {
        setYear(newYear);
        setSemester(newSemester);
    };
    const handleNextClick = () => {
        navigate("/test/1");
    };

    const toHome = () => {
        navigate('/');
    };
    

    return (
        <>
            <Header>
                <img src={textLogo} style={{ width: '200px', height: '40px', cursor: 'pointer' }} onClick={toHome}></img>
            </Header>
            <QuizDom>
                <ProgressBar currentStep={1} totalSteps={4} />
                <QuestionContainer>
                    학업으로의 복귀는 언제인가요?
                    <Detail>*복학 또는 개강 시점을 알려주세요</Detail>
                </QuestionContainer>
                <YearSemesterSelector onChange={handleYearSemesterChange} />
                <ButtonDom>
                    <Button style={{ backgroundColor: 'rgba(30, 58, 138, 1)', color: 'white' }} onClick={handleNextClick}>
                        다음
                    </Button>
                </ButtonDom>
            </QuizDom>
        </>
    )
};

export default Test;

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

export const QuizDom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    border-radius: 20px;
`;

export const QuestionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    color: #1E3A8A;
    font-size: 24px;
    font-weight: 700;
    width: 600px;
    border-radius: 10px;
`;

export const Detail = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: rgba(30, 58, 138, 0.5);
    padding-top: 15px;
`;

export const ButtonLink = styled(Link)`
    display: flex;
    text-decoration: none;
    width: 280px;
    height: 40px;
    padding: 5px 15px;
    gap: 10px;
    border-radius: 10px;
    color: rgba(30, 58, 138, 0.5);
    background-color: #ffffff;
    border: 1px solid rgba(30, 58, 138, 0.2);
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(30, 58, 138, 0.2);
    }

    &:active {
        background-color: rgba(30, 58, 138, 0.2);
    }
`;

export const Button = styled.div`
    display: flex;
    text-decoration: none;
    width: 600px;
    height: 24px;
    padding: 5px 15px;
    gap: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    border: 1px solid rgba(30, 58, 138, 0.2);
    color: rgba(30, 58, 138, 0.5);
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(30, 58, 138, 0.2);
    }

    &:active {
        background-color: rgba(30, 58, 138, 0.2);
    }
`;

export const ButtonDom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 590px;
    height: 44px;
    gap: 30px;
    margin-top: 0.5rem;
`;