import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiThumbsUp } from 'react-icons/fi';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { getBingo, getDday, getHueInfo, getSaved, getTypeRecommend, getUpcomming, putDday} from '../../apis/testapis';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook'
import { RightDom } from './BingoInfo';
import { LineDom, RecommendDom, RecommendCom, StyledDday1, StyledDday2,Body,InfoDom,Info,Selector  } from './Home';
import { prepDateState, bingoState, usernameState, startDateState, endDateState, titleState, bingoIdState, Day1State, Day2State, isExecutedState } from '../../recoil/atoms';
import CustomCalendar from './CustomCalendar';

const Index = () => {
  const options = ["추천순", "마감순", "보관함"];
  const navigate = useNavigate();
  const [bingos, setBingos] = useRecoilState(bingoState);
  const [recommend, setRecommend] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [saved, setSaved] = useState([]);
  const [typeRecommend, setTypeRecommend] = useState([]);
  const [array, setArray] = useState('추천순');
  const [error, setError] = useState(null);
  const [username, setUsername] = useRecoilState(usernameState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [title, setTitle] = useRecoilState(titleState);
  const [id, setId] = useState(bingoIdState);
  const [Dday1, setDday1] = useRecoilState(Day1State);
  const [Dday2, setDday2] = useRecoilState(Day2State);
  const [isExecuted, setIsExecuted] = useRecoilState(isExecutedState);
  const [prepDates, setPrepDates] = useRecoilState(prepDateState);
  

  const handleArrayChange = (event) => {
    const selectedValue = event.target.value;
    setArray(selectedValue);
    if (selectedValue === '마감순') {
      viewUpcomming();
    } else if (selectedValue === '추천순') {
      viewRecommend();
    } else if (selectedValue === '보관함') {
      viewSaved();
    }
  };

  const viewRecommend = async () => {
    try {
      const response = await getHueInfo();
      const recommendations = response.map((item) => ({
        title: item.title,
        image: item.images[0]?.image || '',
        id: item.id,
      }));
      setRecommend(recommendations);
    } catch (error) {
      setError(error);
    }
  };

  const viewUpcomming = async () => {
    try {
      const response = await getUpcomming();
      const upcommings = response.results.map((item) => ({
        title: item.title,
        id: item.id,
      }));
      setUpcomming(upcommings);
    } catch (error) {
      setError(error);
    }
  };

  const viewSaved = async () => {
    try {
      const response = await getSaved();
      const saveds = response.stored_reviews.map((item) => ({
        title: item.title,
        id: item.id,
      }));
      setSaved(saveds);
    } catch (error) {
      setError(error);
    }
  };

  const viewTypeRecommend = async () => {
    try {
      const response = await getTypeRecommend();
      const typeData = response.data.map((item) => ({
        title: item.title,
        id: item.id,
      }));
      setTypeRecommend(typeData);
    } catch (error) {
      setError(error);
    }
  };

  const getBingos = async () => {
    try {
      const response = await getBingo();
      const username = response.username;
      const start_date = response.start_date;
      const end_date = response.end_date;
      const bingoData = Array.from({ length: 9 }, (_, index) => ({
        id: response.bingo_obj.find((item) => item.location === index)?.id || '',
        location: index,
        title: response.bingo_obj.find((item) => item.location === index)?.title || '',
        }),
      )
      setUsername(username);
      setStartDate(start_date);
      setEndDate(end_date);
      setBingos(bingoData);
      setTitle(bingoData.map((item) => item.title));
      // console.log(response);
      // console.log(response.bingo_obj);
      const executedArray = Array.from({ length: 9 }, (_, index) => {
        const item = response.bingo_obj.find((item) => item.location === index);
        return item?.is_executed ? 1 : 0;
      });
      const isExecuted = response.bingo_obj.map((item) => item.is_executed ? 1 : 0);
      // console.log(isExecuted);
      setIsExecuted(executedArray); 
      // console.log(executedArray); 
    } catch (error) {
      setError(error);
      navigate("/bingo");
    }
  };

  const handleInfoClick = (id) => {
    navigate(`/info/${id}`);
  };

  const goHueInfo = () => {
    navigate('/hueInfo');
  };

  const goHueInfo2 = () => {
    navigate('/hueInfo2');
  };

  const clickBingo = (location) => {
    navigate(`/madedbingo/${location}`);
  };

  const formatDateString = (date) => {
    const formattedDate = date.toLocaleDateString();
    const [year, month, day] = formattedDate.split('.').map(element => element.trim());
    return `${year}.${month.length === 2 ? month : '0' + month}.${day.length === 2 ? day : '0' + day}`;
  };

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
      setError('Error posting dates');
      console.error('Error in putDday:', error.response ? error.response.data : error.message);
    }
  };


  const getDdays = async () => {
    try {
      const get_response = await getDday();
      if (get_response && get_response.display) {
        setDday1(get_response.display.rest_dday_display);
        setDday2(get_response.display.return_dday_display);
        // console.log(get_response);
      } else {
        setError('Invalid response structure');
        console.error('Invalid response structure:', get_response);
      }
    } catch (error) {
      setError('Error getting dates');
      console.error('Error in getDday:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    viewRecommend();
    viewSaved();
    viewTypeRecommend();
    getBingos();
    getDdays();
  }, [bingos]);

  return (
    <>
      <HeaderHook />
      <Body>
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
            {bingos.map((bingo, index) => (
              <Bingo
                key={index}
                inBingo={bingo.title !== ''}
                isExecuted={isExecuted[index]}
                onClick={() => clickBingo(index)}
              >
                {bingo.title || ''}
              </Bingo>
            ))}
          </BingoDom>
        </LeftDom>
        <RightDom style={{ paddingTop: '20px' }}>
          <div>
            <FiThumbsUp /> 휴알유 추천
          </div>
          {recommend && recommend.length > 1 && (
            <RecommendDom>
              <RecommendCom draggable={false} onClick={goHueInfo}>
                <img
                  src={recommend[0].image}
                  alt={recommend[0].title}
                  style={{ width: '100%', height: '80%', objectFit: 'cover', borderRadius: '10px' }}
                />
                <div>{recommend[0].title}</div>
              </RecommendCom>
              <RecommendCom draggable={false} onClick={goHueInfo2}>
                <img
                  src={recommend[1].image}
                  alt={recommend[1].title}
                  style={{ width: '100%', height: '80%', objectFit: 'cover', borderRadius: '10px' }}
                />
                <div>{recommend[1].title}</div>
              </RecommendCom>
            </RecommendDom>
          )}
          <Line>
            <Selector
              value={array}
              onChange={handleArrayChange}
              style={{
                background: 'white',
                color: 'rgba(30, 58, 138, 1)',
                border: '1px solid rgba(30, 58, 138, 1)',
              }}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Selector>
            <div style={{ marginTop: '10px' }}>마음에 드는 활동을 빙고판에 끌어서 옮겨보세요</div>
          </Line>
          <InfoDom>
            {array === '마감순' ? (
              upcomming.map((item, index) => (
                <Info key={index} onClick={() => handleInfoClick(item.id)}>
                  {item.title}
                  <IoIosInformationCircleOutline />
                </Info>
              ))
            ) : array === '보관함' ? (
              saved.map((item, index) => (
                <Info key={index} onClick={() => handleInfoClick(item.id)}>
                  {item.title}
                  <IoIosInformationCircleOutline />
                </Info>
              ))
            ) : (
              typeRecommend.map((item, index) => (
                <Info key={index} onClick={() => handleInfoClick(item.id)}>
                  {item.title}
                  <IoIosInformationCircleOutline />
                </Info>
              ))
            )}
          </InfoDom>
        </RightDom>
      </Body>
      <FooterHook />
    </>
  );
};

export default Index;

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

const Line = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 3%;
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
  background :${({ isExecuted }) => (isExecuted ? 'linear-gradient(154deg, #FFF -76.67%, #1E3A8A 103.17%);' : 'linear-gradient(178.58deg, #FFFFFF -94.22%, #A3A3A3 151.7%)' )};
  box-shadow: ${({ inBingo }) => (inBingo ? '2px 2px 4px 0px #D9D9D9 inset, -4px -4px 5px 0px rgba(81, 81, 81, 0.25) inset' : '0px -2px 6px 0px rgba(0, 0, 0, 0.25) inset, 4px 4px 10px 0px rgba(0, 0, 0, 0.25) inset')};
`;