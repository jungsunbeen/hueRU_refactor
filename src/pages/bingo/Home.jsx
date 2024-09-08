import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { getDday, getHueInfo, getSaved, getTypeRecommend, getUpcomming, postBingo, putDday } from '../../apis/testapis';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { RightDom } from './BingoInfo';
import { prepDateState, bingoState, usernameState, startDateState, endDateState, titleState, bingoObjectState, Day1State, Day2State } from '../../recoil/atoms';
import CustomCalendar from './CustomCalendar';
import { FiThumbsUp } from 'react-icons/fi';

const Home = () => {
  const options = ["추천순", "마감순", "보관함"]; //셀렉터 목록
  const navigate = useNavigate();
  const [bingos, setBingos] = useRecoilState(bingoState);
  const [recommend, setRecommend] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [saved, setSaved] = useState([]);
  const [typeRecommend, setTypeRecommend] = useState([]);
  const [array, setArray] = useState('추천순'); //default값
  const [error, setError] = useState(null);
  const [username] = useRecoilState(usernameState);
  const [title, setTitle] = useRecoilState(titleState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [prepDates, setPrepDates] = useRecoilState(prepDateState);
  const [bingoObject, setBingoObject] = useRecoilState(bingoObjectState);
  const [Dday1, setDday1] = useRecoilState(Day1State);
  const [Dday2, setDday2] = useRecoilState(Day2State);

  //목록에 띄워줄 값
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
  //휴알유 추천 받아오는 함수
  const viewRecommend = async () => {
    const response = await getHueInfo();
    const recommendations = response.map((item) => ({
      title: item.title,
      image: item.images[0]?.image || '',
      id: item.id,
      isNotice: item.is_notice,
    }));
    setRecommend(recommendations);
  };
  //마감순 받아오기
  const viewUpcomming = async () => {
    const response = await getUpcomming();
    const upcommings = response.results.map((item) => ({
      title: item.title,
      id: item.id,
    }));
    setUpcomming(upcommings);
  };
  //보관함 받아오기
  const viewSaved = async () => {
    const response = await getSaved();
    const saveds = response.stored_reviews || [];
    const savedData = saveds.map((item) => ({
      title: item.title,
      id: item.provided_bingo_item,
    }));
    setSaved(savedData);
    // console.log(response);
    // console.log(savedData);
  };
  //추천순 받아오기
  const viewTypeRecommend = async (type) => {
    const response = await getTypeRecommend(type);
    const typeData = response.data.map((item) => ({
      title: item.title,
      id: item.id,
    }));
    setTypeRecommend(typeData);
  };
  //빙고 data api body에 따른 initial설정
  const fetchBingoData = () => {
    const initialBingos = Array.from({ length: 9 }, (_, index) => ({
      id: '',
      location: index,
      title: '',
    }));
    setBingos(initialBingos);
    setTitle(initialBingos.map((item) => item.title));
  };
  //빙고 포스트 함수
  const postBingos = async () => {
    try {
      const bingoBody = {
        size: 9,
        start_date: startDate,
        end_date: endDate,
        bingo_obj: bingoObject.bingo_obj,
      };
      const hasEmptyTitle = bingoBody.bingo_obj.some(item => item.title === '');
    if (hasEmptyTitle) {
      alert("9개의 칸을 채워야 빙고를 만드실 수 있습니다")
      return;
    }
      const response = await postBingo(bingoBody);
      bingoBody.bingo_obj.map()
      alert(response);
      navigate("/veiw");
    } catch (error) {
      setError('Error posting bingo data');
      console.error('Error in postBingo:', error.response ? error.response.data : error.message);
    }
  };
  //드래그앤드롭 설정
  const [draggingInfo, setDraggingInfo] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  //드래그 스타트 목록에서 index를 넘겨준다
  const handleDragStart = (index, type) => {
    if (type === 'bingo') {
      setDraggingIndex(index);
      setDraggingInfo(null);
    } else {
      if (type === 'upcomming') {
        setDraggingInfo(upcomming[index]);
        setDraggingIndex(null);
      } else if (type === 'saved') {
        setDraggingInfo(saved[index]);
        setDraggingIndex(null);
      } else if (type === 'typeRecommend') {
        setDraggingInfo(typeRecommend[index]);
        setDraggingIndex(null);
      } else {
        setError('드래그할 수 없습니다');
        setDraggingInfo(null);
      }
    }
  };
  //드롭시 
  const handleDrop = (index) => {
    const newBingos = [...bingos];
    const newTitles = [...title];
    try {
      if (draggingInfo !== null) {
        newBingos[index] = { location: index, title: draggingInfo.title };
        newTitles[index] = draggingInfo.title;
        setDraggingInfo(null);
        setBingos(newBingos);
        setTitle(newTitles);
        navigate(`/madedragbingo/${draggingInfo.id}/${newBingos[index].location}`);
      } else if (draggingIndex !== null) {
        [newBingos[draggingIndex], newBingos[index]] = [newBingos[index], newBingos[draggingIndex]];
        [newTitles[draggingIndex], newTitles[index]] = [newTitles[index], newTitles[draggingIndex]];
        setDraggingIndex(null);
        setBingos(newBingos);
        setTitle(newTitles);
      } else {
        throw new Error('드래그할 수 없습니다');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error in handleDrop:', error.response ? error.response.data : error.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  //인포 클릭시 info 페이지로 이동 id값을 쿼리로 전달
  const handleInfoClick = (id) => {
    navigate(`/info/${id}`);
  };
  //휴알유추천 페이지로 이동
  const goHueInfo = () => {
    navigate('/hueInfo');
  };
  const goHueInfo2 = () => {
    navigate('/hueInfo2');
  };
  //빙고 클릭시 빙고 페이지로 이동 로케이션 쿼리로 전달
  const clickBingo = (location) => {
    navigate(`/madedinclient/${location}`);
  };
  //빈 빙고 클릭시 직접 만드는 빙고 페이지로 이동 로케이션 쿼리로 전달
  const clickemptyBingo = (location) => {
    navigate(`/made/${location}`);
  };
  //캘린더 설정함수
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

  const formatDateString = (date) => {
    const formattedDate = date.toLocaleDateString();
    const [year, month, day] = formattedDate.split('.').map(element => element.trim());
    return `${year}.${month.length === 2 ? month : '0' + month}.${day.length === 2 ? day : '0' + day}`;
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      navigate('login');
      return;
    }
    // if(!username) {
    //   alert("유형화 테스트가 필요한 기능입니다");
    //   navigate('/test/0');
    //   return;
    // }
    getDdays();
    viewRecommend();
    viewSaved();
    viewTypeRecommend();
    if (bingos.length === 0) {
      fetchBingoData();
    }
  }, [bingoObject, navigate]);

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
                ? `${new Date(startDate).toLocaleDateString()} ~ ${new Date(endDate).toLocaleDateString()}` : '날짜를 입력하세요.'}
              <CustomCalendar onChange={handlePrepDateChange} value={prepDates} />
            </Line>
            <Line style={{ fontSize: '24px' }}>투두리스트 빙고판</Line>
          </LineDom>
          <BingoDom>
            {bingos.map((bingo, index) => {
              const inBingo = bingo.title !== '';
              return (
                <Bingo
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index, 'bingo')}
                  onDrop={() => handleDrop(index)}
                  onDragOver={handleDragOver}
                  inBingo={inBingo}
                  onClick={() => inBingo ? clickBingo(bingo.location) : clickemptyBingo(bingo.location)}
                >
                  {bingo.title || ''}
                </Bingo>
              );
            })}
          </BingoDom>
          <Button style={{ marginLeft: '473px', marginTop: '4px' }} onClick={postBingos}>완료</Button>
        </LeftDom>
        <RightDom style={{paddingTop : '20px'}}>
          <div>
          <FiThumbsUp /> 휴알유 추천
          </div>
          {recommend && recommend.length > 1 && (
            <RecommendDom>
              <RecommendCom draggable={false}
                onClick={goHueInfo}>
                <img src={recommend[0].image} alt={recommend[0].title} style={{ width: '100%', height: '80%', objectFit: 'cover', borderRadius: '10px' }} />
                <div>{recommend[0].title}</div>
              </RecommendCom>
              <RecommendCom draggable={false}
                onClick={goHueInfo2}>
                <img src={recommend[1].image} alt={recommend[1].title} style={{ width: '100%', height: '80%', objectFit: 'cover', borderRadius: '10px' }} />
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
                <Info key={index} draggable onDragStart={() => handleDragStart(index, 'upcomming')} onClick={() => handleInfoClick(item.id)}>
                  {item.title}
                  <IoIosInformationCircleOutline />
                </Info>
              ))
            ) : array === '보관함' ? (
              saved.map((item, index) => (
                <Info key={index} draggable onDragStart={() => handleDragStart(index, 'saved')} onClick={() => handleInfoClick(item.id)}>
                  {item.title}
                  <IoIosInformationCircleOutline />
                </Info>
              ))
            ) : (
              typeRecommend.map((item, index) => (
                <Info key={index} draggable onDragStart={() => handleDragStart(index, 'typeRecommend')} onClick={() => handleInfoClick(item.id)}>
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

export default Home;

export const Logo = styled.div`
  width : 10px;
  height : 10px;
`

export const LineDom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding : 10px;
`;

export const StyledDday1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color : white ;
  width : 84px;
  height: 25px;
  background: linear-gradient(178.58deg, #FFFFFF -94.22%, #A3A3A3 151.7%);
  border-radius: 10px;
`;
export const StyledDday2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color : white ;
  width : 84px;
  height: 25px;
  background: linear-gradient(141.57deg, #FFFFFF -204.94%, #1E3A8A 93.49%);
  border-radius: 10px;
  box-shadow: -4px -4px 5px 0px rgba(81, 81, 81, 0.25) inset;
`;

export const Header = styled(Link)`
  color: rgba(30, 58, 138, 1);
  text-decoration: none;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 10%;
  width: 100%;
  color: #1e3a8a;
  height: 660px;
  gap: 10px;
`;

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

export const Bingo = styled.div.attrs((props) => ({
  'data-inbingo': props.inBingo,
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

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 16px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(30, 58, 138, 1);
  color: white;
`;

export const RecommendDom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-bottom: 0.4px solid rgba(30, 58, 138, 0.7);
  padding-bottom: 30px;
`;

export const RecommendCom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 155px;
  gap: 0px;
  border-radius: 10px;
  background: #ffffff;
  padding: 10px;
`;

export const InfoDom = styled.div`
  height: 310px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-y: auto;
`;

export const Info = styled.div`
  height: 40px;
  border-radius: 20px;
  background-color: white;
  border: 1px solid rgb(207, 209, 218);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 0 10px;
  gap: 5px;
  scroll-snap-align: start;
  position: relative;
  &:hover {
    background-color: rgba(30, 58, 138, 0.2);
    color: #1e3a8a;
  }
  span {
    margin-left: 5px;
  }
  
  // border: 2px solid var(--main-10, #E9ECF4);
  opacity: var(--sds-size-stroke-border);

`;

export const Selector = styled.select`
  font-size: 15px;
  padding: 10px;
  border-radius: 10px;
  width: 110px;
  border: none;
  background: rgba(30, 58, 138, 1);
  color: white;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 3%;
`;

