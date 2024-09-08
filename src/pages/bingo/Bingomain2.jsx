import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { bingoState, usernameState, startDateState, endDateState, titleState, Day1State, Day2State, bingoObjectState, isExecutedState, prepDateState } from '../../recoil/atoms';
import { getBingo, getDday, putDday } from '../../apis/testapis';
import {StyledDday1, StyledDday2} from './Home';
import { useNavigate } from 'react-router-dom';
import CustomCalendar from './CustomCalendar';
//빙고를 만들기 전 (api post 하기 전) 보여주는 빙고칸
const Bingomain2 = () => {
  const [bingos, setBingos] = useRecoilState(bingoState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [title, setTitle] = useRecoilState(titleState);
  const [Dday1, setDday1] = useRecoilState(Day1State);
  const [Dday2, setDday2] = useRecoilState(Day2State);
  const [isExecuted, setIsExecuted] = useRecoilState(isExecutedState);
  const [prepDates, setPrepDates] = useRecoilState(prepDateState);
  //빙고 불러오는 함수
  // const getBingos = async () => {
  //   const response = await getBingo();
  //   const username = response.username;
  //   const start_date = response.start_date;
  //   const end_date = response.end_date;
  //   const bingos = Array.from({ length: 9 }, (_, index) => ({
  //     location: index,
  //     title: response.bingo_obj.find((item) => item.location === index)?.title || '',
  //   }));
  //   setUsername(username);
  //   setStartDate(start_date);
  //   setEndDate(end_date);
  //   setBingos(bingos);
  //   setTitle(bingos.map((item) => item.title));
  // };

  //빙고를 만든 후에도 d-day 설정가능하도록
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
      console.log(response);
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
        <Line style={{ fontSize: '24px' }}>투두리스트 빙고판</Line>
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

export default Bingomain2;

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

export const Bingo = styled.div.attrs((props) => ({
  'data-inbingo': props.inBingo,
  'data-isexecuted': props.isExecuted,
}))`
  width: 150px;
  height: 150px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  margin: auto;
  border-radius: 10px;
  opacity: var(--sds-size-stroke-border);
  color: white;
  text-align: center;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.3s ease-in-out;
  background :${({ inBingo }) => (inBingo ? 'linear-gradient(178.58deg, #FFFFFF -94.22%, #A3A3A3 151.7%)' : 'var(--gray-10, #F5F5F5)')};
  box-shadow: ${({ inBingo }) => (inBingo ? '2px 2px 4px 0px #D9D9D9 inset, -4px -4px 5px 0px rgba(81, 81, 81, 0.25) inset' : '0px -2px 6px 0px rgba(0, 0, 0, 0.25) inset, 4px 4px 10px 0px rgba(0, 0, 0, 0.25) inset')};
`;