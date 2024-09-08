import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace, MdOutlineNearMe } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { getBingoloc, postTodolist } from '../../apis/testapis';
import { Category, CheckLists, CheckList, CheckBox} from './MadeBingo';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import Bingomain from './Bingomain';
import { FiEdit3 } from 'react-icons/fi';
import { RightDom,DateInfo ,TitleLine,Car} from './BingoInfo';
import { isExecutedState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';
const MadedBingo = () => {
  const navigate = useNavigate();
  const { location } = useParams();
  const [checklists, setChecklists] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [info, setInfo] = useState(null);
  const [isExecuted, setIsExecuted] = useRecoilState(isExecutedState);

  const goHome = () => {
    navigate("/view");
  };

  const getInfos = async (location) => {
    try {
      const response = await getBingoloc(location);
      const info = {
        large_category_display: response.bingo_item.large_category_display,
        title: response.bingo_item.title,
        app_fee: response.bingo_item.app_fee,
        app_due: response.bingo_item.app_due,
        start_date: response.bingo_item.start_date,
        end_date: response.bingo_item.end_date,
        host: response.bingo_item.host,
        prep_period: response.bingo_item.prep_period,
        area: response.bingo_item.area,
        employment_form: response.bingo_item.employment_form,
        field: response.bingo_item.field,
        duty: response.bingo_item.duty,
      };
      const todos = response.todo.map(todo => ({
        id: todo.id,
        text: todo.title,
        checked: todo.is_completed
      }));
      setInfo(info);
      setChecklists(todos);
    } catch (error) {
      console.error('Error in getInfos:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (location) {
      getInfos(location);
    }
  }, [location]);

  const toggleCheck = (id) => {
    const updatedChecklists = checklists.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setChecklists(updatedChecklists);
    const isChecked = updatedChecklists.find(item => item.id === id)?.checked;
    const postmessage = {
      "is_completed": isChecked
    };
    postTodolists(id, postmessage);
    // console.log(postmessage);
  };

  const postTodolists = async (id, postmessage) => {
    try {
      const response = await postTodolist(id, postmessage);
      // console.log(response);
    } catch (error) {
      console.error('Error in postTodolists:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const doEdit = () => {
    navigate(`/madededit/${location}`);
  }

  const handleMadeReviewClick = (location) => {
    if(isExecuted[location]==0){
      navigate(`/dragreview/${location}`);
    }else{
      alert("이미 작성하신 리뷰가 있습니다.");
    }
  }

  return (
    <>
      <HeaderHook />
      <Body>
        <Bingomain />
        <RightDom>
          <TitleLine>
            <MdOutlineKeyboardBackspace onClick={goHome} size={30} />
          </TitleLine>
          <TitleLine>
            <h1>{info ? info.title : 'Loading...'}</h1>
          </TitleLine>
          <Line>
            <Car>
              <Category>분류</Category>
            </Car>
            <Category style={{  color: 'white' ,
              border:'none',
              opacity: 'var(--sds-size-stroke-border)',
              background: 'linear-gradient(142deg, #FFF -204.94%, #1E3A8A 93.49%)',
              boxShadow: '-4px -4px 5px 0px rgba(81, 81, 81, 0.25) inset'
            }}>
              {info ? info.large_category_display : 'Loading...'}
            </Category>
          </Line>
          {info && info.host ? (
            <Line>
              <Car><Category>주최사</Category></Car>
              
              <div>{info.host}</div>
            </Line>
          ) : null}
          {info && info.field ? (
            <Line>
              <Car><Category>활동 분야</Category></Car>
              
              <div>{info.field}</div>
            </Line>
          ) : null}
          {info && info.app_fee ? (
            <Line>
              <Car><Category>응시료</Category></Car>
              
              <div>{info.app_fee}원</div>
            </Line>
          ) : null}
          {info && info.duty ? (
            <Line>
              <Car><Category>직무</Category></Car>
              
              <div>{info.duty}</div>
            </Line>
          ) : null}
          {info && info.employment_form ? (
            <Line>
              <Car><Category>채용 형태</Category></Car>
              
              <div>{info.employment_form}</div>
            </Line>
          ) : null}
          {info && info.area ? (
            <Line>
              <Car><Category>활동 지역</Category></Car>
              
              <div>{info.area}</div>
            </Line>
          ) : null}
          {info && info.app_due ? (
            <Line>
              <Car><Category>지원 마감</Category></Car>
              
              <div>{info.app_due}</div>
            </Line>
          ) : null}
          {info && info.prep_period ? (
            <Line>
              <Car><Category>준비 기간</Category></Car>
              
              <div>{info.prep_period}</div>
            </Line>
          ) : null}
          {info && info.start_date ? ((
            <Line>
              <Car><Category>활동 기간</Category></Car>
              
              <div>{info.start_date} ~ {info.end_date}</div>
            </Line>
          )) : null}
          <TitleLine style={{fontSize : '20px'}}>
            <div>| 세부계획 <FiEdit3 onClick={doEdit}/> </div>
          </TitleLine>
          <CheckLists>
            {checklists.map((item, index) => (
              <CheckList key={index} checked={item.checked}>
                {item.checked ? (
                  <AiOutlineCheckSquare size={20} onClick={() => toggleCheck(item.id)} />
                ) : (
                  <CheckBox onClick={() => toggleCheck(item.id)} />
                )}
                <span>{item.text}</span>
              </CheckList>
            ))}
            <Line></Line>
          </CheckLists>
          <DateInfo style={{ width: '30%', marginLeft: '67%' }} onClick={() => handleMadeReviewClick(location)}>목표 달성 기록 남기기</DateInfo>
        </RightDom>
      </Body>
      <FooterHook />
    </>
  );
};

export default MadedBingo;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-left: 10px;
`;

const Body = styled.div`
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