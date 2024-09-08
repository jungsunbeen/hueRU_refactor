import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResultDom, ResultInfo, Title, Image } from './Result'
import { Line } from '../bingo/MadeBingo'
import { ButtonDom, ButtonLink } from './Test'
import { FiArrowRightCircle } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { useLocation } from "react-router-dom";
import textLogo from '../../images/Frame 8.png';

const ViewResult = () => {
    const {type} = useParams();
    const [userType, setUserType] = useState("");
    const [content, setContent] = useState([]);
    const [image, setImage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const getTypeTestResult = async(type) => {
        try {
            const response = await axios.get(`https://maknaengee.p-e.kr/typetest/result/${type}`);
            setUserType(response.data.user_type_display);
            setContent(response.data.content.split('\n'));
            setImage(response.data.image);
            return response.data;
        } catch (error) {
            console.error('Error in getInfo:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
    
    useEffect(() => {
        if(type) {
        getTypeTestResult(type);
        }
    }, [type]);

    const toHome = () => {
      navigate('/');
    };

  return (
    <>
    <Header>
          <img src={textLogo} style={{ width: '200px', height: '40px', cursor: 'pointer' }} onClick={toHome}></img>
    </Header>
    <ResultDom>
      <Image>
        <img src={image} style={{width:'100%'}} alt="result"></img>
      </Image>
      <Title>"{userType}"</Title>
      <ResultInfo>
        {content.map((line, index) => (
          <Line>
            <p key={index}>{line}</p>
          </Line>
        ))}
      </ResultInfo>
      <ButtonDom>
        <ButtonLink style={{ backgroundColor: 'rgba(30, 58, 138, 1)', color: 'white' }} to="/test/0">
          <FiArrowRightCircle/> 테스트 하러가기 
        </ButtonLink>
      </ButtonDom>
    </ResultDom>
  </>
  )
}

export default ViewResult

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