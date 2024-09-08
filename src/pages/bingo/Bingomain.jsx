import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { bingoState, usernameState, startDateState, endDateState, titleState, Day1State, Day2State, bingoObjectState, isExecutedState, prepDateState } from '../../recoil/atoms';
import { getBingo, getDday, putDday } from '../../apis/testapis';
import {StyledDday1, StyledDday2} from './Home';
import { Bingo } from './Index';
import { useNavigate } from 'react-router-dom';
import CustomCalendar from './CustomCalendar';
//Bingomain2와 다른 점은 빙고를 이미 만든 후의 빙고를 보여주는 것입니다. isExecuted에 따라 빙고가 달라짐
const Bingomain = () => {
  const [bingos, setBingos] = useRecoilState(bingoState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [title, setTitle] = useRecoilState(titleState);
  const [Dday1, setDday1] = useRecoilState(Day1State);
  const [Dday2, setDday2] = useRecoilState(Day2State);
  const [isExecuted, setIsExecuted] = useRecoilState(isExecutedState);
  const [prepDates, setPrepDates] = useRecoilState(prepDateState);
  //빙고칸 정보 가져오기
  const getBingos = async () => {
    const response = await getBingo();
    const username = response.username;
    const start_date = response.start_date;
    const end_date = response.end_date;
    const bingos = Array.from({ length: 9 }, (_, index) => ({
      location: index,
      title: response.bingo_obj.find((item) => item.location === index)?.title || '',
    }));
    setUsername(username);
    setStartDate(start_date);
    setEndDate(end_date);
    setBingos(bingos);
    setTitle(bingos.map((item) => item.title));
  };
  //디데이 설정 함수
  const getDdays = async () => {
    try {
      const get_response = await getDday();
      if (get_response && get_response.display) {
        setDday1(get_response.display.rest_dday_display);
        setDday2(get_response.display.return_dday_display);
      } else {
        console.error('Invalid response structure:', get_response);
      }
    } catch (error) {
      console.error('Error in getDday:', error.response ? error.response.data : error.message);
    }
  };
  //캘린더에서 설정한 날짜 api 요청 양식에 따라 format하는 함수
  const formatDateString = (date) => {
    const formattedDate = date.toLocaleDateString();
    const [year, month, day] = formattedDate.split('.').map(element => element.trim());
    return `${year}.${month.length === 2 ? month : '0' + month}.${day.length === 2 ? day : '0' + day}`;
  };
  //캘린더에서 날짜 설정하는 함수
  const handlePrepDateChange = async (prepDates) => {
    setPrepDates(prepDates); 
    const [startDate, endDate] = prepDates;
    
    const formattedStartDate = formatDateString(startDate);
    const formattedEndDate = formatDateString(endDate);

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    try {
      const response = await putDday({ rest_school: formattedStartDate, return_school: formattedEndDate });
      setDday1(response.display.rest_dday_display);
      setDday2(response.display.return_dday_display);
      // console.log(response);
    } catch (error) {
      // setError('Error posting dates');
      console.error('Error in putDday:', error.response ? error.response.data : error.message);
    }
  };
  //빙고 클릭시 빙고 상세 페이지로 이동하는 함수
  const navigate = useNavigate();
  const clickBingo = (location) => {
    navigate(`/madedbingo/${location}`);
  };

  useEffect(() => {
    if (bingos.length === 0) {
      getBingos();
    }
    if (!Dday1 && !Dday2) {
      getDdays();
    }
  }, [bingos]);

  return (
    <LeftDom>
      <LineDom>
        <Line>
          <StyledDday1>{Dday1}</StyledDday1>
          <StyledDday2>{Dday2}</StyledDday2>
        </Line>
        <Line style={{ color: 'grey' }}>
          {startDate && endDate
            ? `${new Date(startDate).toLocaleDateString()} ~ ${new Date(endDate).toLocaleDateString()}`
            : '날짜를 입력하세요.'}
          <CustomCalendar onChange={handlePrepDateChange} value={prepDates} />
        </Line>
        <Line style={{ fontSize: '24px' }}>{username}의 빙고판</Line>
      </LineDom>
      <BingoDom>
        {Array.isArray(bingos) && bingos.map((item, index) => (
          <Bingo
            key={index}
            inBingo={item.title !== ''}
            isExecuted={isExecuted[index]}
            onClick={() => clickBingo(index)}
          >
            {title[index]}
          </Bingo>
        ))}
      </BingoDom>
    </LeftDom>
  );
};

export default Bingomain;

const LeftDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 550px;
`;

const BingoDom = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 550px;
`;

const LineDom = styled.div`
  display: flex;
  flex-direction: column;
  gap : 10px;
  margin-bottom: 10px;
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  margin-left: 10px;
  color : rgba(30, 58, 138, 1);
`;