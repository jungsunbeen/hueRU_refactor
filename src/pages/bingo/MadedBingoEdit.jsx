import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace, MdOutlineNearMe } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Bingo, Body } from './Home';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { getBingoloc, getInfo, putBingoloc } from '../../apis/testapis';
import { Category, CheckLists, CheckList, InputBox } from './MadeBingo';
import { RightDom,DateInfo ,TitleLine,Car} from './BingoInfo';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { CiSquarePlus } from 'react-icons/ci';
import Bingomain from './Bingomain';
import { useRecoilState } from 'recoil';
import { bingoState, bingoObjectState } from '../../recoil/atoms';

const MadedBingoEdit = () => {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const { id, location } = useParams();
  const [info, setInfo] = useState(null);
  const [bingos, setBingos] = useRecoilState(bingoState);
  const [bingoObject, setBingoObject] = useRecoilState(bingoObjectState);

  const goHome = () => {
    navigate("/view");
  };

  const getBingo = async (location) => {
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
        title: todo.title,
        is_completed: todo.is_completed,
        bingo: todo.bingo,
        bingo_space: todo.bingo_space,
        user: todo.user
      }));
      setInfo(info);
      setChecklists(todos);
    } catch (error) {
      console.error('Error in getInfos:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const madeCheckList = () => {
    if (newChecklistText.trim() === '') return;
    const newChecklist = {
      title: newChecklistText,
      is_completed: false,
      bingo: 43,
      bingo_space: 61,
      user: 8
    };
    setChecklists([...checklists, newChecklist]);
    setNewChecklistText('');
    // console.log(checklists);
  };

  const deleteCheckList = (id) => {
    const updatedChecklists = checklists.filter(item => item.id !== id);
    setChecklists(updatedChecklists);
    // console.log(checklists);
  };

  const putBingoChecklist = async (location, checklists) => {
    try {
      // 새로 추가된 항목들에 대해서는 id를 포함하지 않도록 함
      const newChecklists = checklists.map(item => {
        const { id, ...rest } = item;
        return rest;
      });

      // 요청 데이터 구성
      const data = {
        todo: [
          ...checklists.filter(item => item.id).map(item => ({
            id: item.id,
            title: item.title,
            is_completed: item.is_completed,
            bingo: item.bingo,
            bingo_space: item.bingo_space,
            user: item.user
          })),
          ...newChecklists.filter(item => !item.id).map(item => ({
            title: item.title,
            is_completed: item.is_completed,
            bingo: item.bingo,
            bingo_space: item.bingo_space,
            user: item.user
          }))
        ]
      };

      const response = await putBingoloc(location, data);
      // console.log(checklists);
      // console.log(response);
      alert(`${response.success} 수정할 기회는 ${response.change_chance}회 남았습니다.`);
    }
    catch (error) {
      console.error('Error in putBingo:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const updateBingo = () => {
    if (!info) return;

    const locationIndex = location.toString();
    const updatedBingoObj = JSON.parse(JSON.stringify(bingoObject.bingo_obj));

    updatedBingoObj[locationIndex] = {
      ...updatedBingoObj[locationIndex],
      todo: checklists.map(item => ({ title: item.title })),
      title: info.title,
      choice: "1",
    };

    setBingoObject(prevState => ({
      ...prevState,
      bingo_obj: updatedBingoObj,
    }));

    setBingos(prevState => {
      const updatedBingos = [...prevState];
      updatedBingos[locationIndex] = { location: locationIndex, title: info.title };
      return updatedBingos;
    });

    putBingoChecklist(locationIndex, checklists);
    navigate('/view');
  };

  useEffect(() => {
    if (location) {
      getBingo(location);
    }
  }, [location]);

  return (
    <>
      <HeaderHook />
      <Body>
        <Bingomain />
        <RightDom>
          <TitleLine>
            <MdOutlineKeyboardBackspace onClick={goHome} size={30} />
            <DateInfo>더 많은 정보 보러가기<MdOutlineNearMe size={20} /></DateInfo>
          </TitleLine>
          <TitleLine>
            <h1>{info ? info.title : 'Loading...'}</h1>
          </TitleLine>
          <Line>
            <Car><Category>분류</Category></Car>
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
            <div> | 세부계획 </div>
          </TitleLine>
          <CheckLists>
            {checklists.map((item) => (
              <CheckList key={item.id} style={{ color: 'rgba(116, 116, 116, 1)' }}>
                <AiOutlineMinusCircle size={20} onClick={() => deleteCheckList(item.id)} />
                <span>{item.title}</span>
              </CheckList>
            ))}
            <Line>
              <InputBox
                type="text"
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                placeholder="세부 계획을 입력하세요"
              />
              <CiSquarePlus size={30} onClick={madeCheckList} />
            </Line>
          </CheckLists>
          <DateInfo style={{ width: '15%', marginLeft: '82%' }} onClick={updateBingo}>저장</DateInfo>
        </RightDom>
      </Body>
      <FooterHook />
    </>
  );
};

export default MadedBingoEdit;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 20px;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
  background: rgba(30, 58, 138, 1);
  color: white;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-left: 10px;
  color: rgba(142, 156, 196, 1);
`;

export const ReviewDom = styled.div`
  display: flex;
  flex-direction: row;
  width: 530px;
  border-radius: 10px;
  gap: 10px;
  padding: 10px;
`;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  gap: 5px;
  border: 1px solid rgba(30, 58, 138, 0.5);
  border-radius: 10px;
`;

const StyledDiv = styled.div`
  border: 0.4px solid rgba(142, 156, 196, 1);
  border-radius: 10px;
  padding: 7px;
`;
