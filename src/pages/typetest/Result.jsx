import { FiShare2, FiArrowRightCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { ButtonDom, ButtonLink } from './Test';
import { postTest } from '../../apis/testapis';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usernameState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';
import { answer2State, answer3State, answer4State, semesterState, yearState } from '../../recoil/testatoms';
import textLogo from '../../images/Frame 8.png';

const Result = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [content, setContent] = useState([]);
  const [image, setImage] = useState("");

  const [semester, setSemester] = useRecoilState(semesterState);
  const [year, setYear] = useRecoilState(yearState);
  const [answer2, setAnswer2] = useRecoilState(answer2State);
  const [answer3, setAnswer3] = useRecoilState(answer3State);
  const [answer4, setAnswer4] = useRecoilState(answer4State);
  const [username, setUsername] = useRecoilState(usernameState);
  const [usertypedisplay, setUserTypeDisplay] = useState('');
  
  const showResult = async () => {
    // test 페이지에서 답변을 받은 것을 post할 body로 만듦
    const answer = {
      "return_year": year,
      "return_semester": semester,
      "answer2": answer2,
      "answer3": answer3,
      "answer4": answer4,
    };
    // post 하는 함수
    try {
      const response = await postTest(answer);
      setUserType(response.user_type);
      setContent(response.content.split('\n'));
      setImage(response.image);
      setUsername(response.username);
      setUserTypeDisplay(response.user_type_display);
      // console.log(response);
      } catch (error) {
      setContent(["모든 문항을 답해주세요."]);
    }
  };

  const goShare = () => {
    const baseURL = 'https://hueareyou.netlify.app'
    const link = `${baseURL}/hueRU/${userType}`; //  response로 받은 user_type로 링크 생성
    navigator.clipboard.writeText(link).then(() => { // 클립보드에 복사
      alert('클립보드에 복사되었습니다');
    }).catch(err => {
      console.error('유효하지 않은 링크입니다', err);
    });
  };

  useEffect(() => {
    showResult();
  }, []);

  const toHome = () => {
    navigate('/');
  };
  const goBingo = () => { 
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      navigate('/login');
      return;
    }
    navigate("/view");
  };

  return (
    <>
      <Header>
        <img src={textLogo} style={{ width: '200px', height: '40px', cursor: 'pointer' }} onClick={toHome}></img>
      </Header>
      <ResultDom>
        <span> {username} 님의 휴학 유형</span>
        <Image>
          <img src={image} style={{width:'100%'}} alt="result"></img>
        </Image>
        <Title>"{usertypedisplay}"</Title>
        <ResultInfo>
          <ul>
            {content.map((line, index) => (
              <li key={index}>
                {line}
              </li>
            ))}
          </ul>
        </ResultInfo>
        <ButtonDom>
          <ButtonLink as="button" onClick={goShare}> <FiShare2 /> 테스트 결과 공유하기 </ButtonLink>
          <ButtonLink as="button" onClick={goBingo} style={{ backgroundColor: 'rgba(30, 58, 138, 1)', color: 'white' }}>
            <FiArrowRightCircle/> 빙고판 채우러가기
          </ButtonLink>
        </ButtonDom>
      </ResultDom>
    </>
  );
};

export default Result;

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

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 15px;
  color: rgba(30, 58, 138, 1);
`;

export const ResultInfo = styled.div`
  height: auto;
  color: rgba(81, 81, 81, 1);
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  padding-top: 3%;
  padding-bottom: 5%;
  li {
    margin-bottom: 3%; 
  }
`;

export const Image = styled.div`
  width: 200px;
  height: 200px;
`;

export const ResultDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding : 60px 100px 100px 100px;
  color: rgba(81, 81, 81, 1);
  span {
    border: 1px solid rgba(81, 81, 81, 1);
    border-radius: 20px;
    padding: 10px 20px 10px 20px;
    font-size: 16px;
    font-weight: 700;
  }
`;
