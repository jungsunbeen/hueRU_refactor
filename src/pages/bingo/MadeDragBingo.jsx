import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace, MdOutlineNearMe } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Body } from './Home';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { getInfo } from '../../apis/testapis';
import { Category, CheckLists, CheckList, InputBox } from './MadeBingo';
import { RightDom,Car } from './BingoInfo';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { CiSquarePlus } from 'react-icons/ci';
import { useRecoilState } from 'recoil';
import { bingoState, bingoObjectState } from '../../recoil/atoms';
import Bingomain2 from './Bingomain2';

const MadeDragBingo = () => {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const { id, location } = useParams();
  const [info, setInfo] = useState(null);
  const [bingos, setBingos] = useRecoilState(bingoState);
  const [bingoObject, setBingoObject] = useRecoilState(bingoObjectState);

  const goHome = () => {
    updateBingo();
    navigate(`/bingo`);
  };

  const getInfos = async (id) => {
    try {
      const response = await getInfo(id);
      const info = {
        large_category_display: response.large_category_display,
        title: response.title,
        app_fee: response.app_fee,
        app_due: response.app_due,
        start_date: response.start_date,
        end_date: response.end_date,
        host: response.host,
        prep_period: response.prep_period,
        area: response.area,
        employment_form: response.employment_form,
        field: response.field,
        duty: response.duty,
      };
      setInfo(info);
    } catch (error) {
      console.error('Error in getInfos:', error.response ? error.response.data : error.message);
    }
  };

  const addChecklist = () => {
    if (newChecklistText.trim() === '') return;
    const newChecklist = { id: checklists.length + 1, title: newChecklistText};
    setChecklists([...checklists, newChecklist]);
    setNewChecklistText('');
  };

  const deleteCheckList = (id) => {
    const updatedChecklists = checklists.filter(item => item.id !== id);
    setChecklists(updatedChecklists);
  };

  const updateBingo = () => {
    if (!info) return;

    const locationIndex = location.toString();
    const idIndex = id.toString();
    const updatedBingoObj = JSON.parse(JSON.stringify(bingoObject.bingo_obj));

    updatedBingoObj[locationIndex] = {
      ...updatedBingoObj[locationIndex],
      id: idIndex,
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
    console.log(bingoObject);
    console.log(bingos);
    
    navigate('/bingo');
  };

  useEffect(() => {
    if (id) {
      getInfos(id);
    }
  }, [id, location]);

  return (
    <>
      <HeaderHook />
      <Body style={{color : 'rgba(30, 58, 138, 1)'}}>
        <Bingomain2 style={{color : 'rgba(30, 58, 138, 1)'}}/>
        <RightDom style={{paddingTop : '20px'}}>
          <TitleLine>
            <MdOutlineKeyboardBackspace onClick={goHome} size={30} />
          </TitleLine>
          <TitleLine style={{color : 'rgba(30, 58, 138, 1)'}}>
            <h1>{info ? info.title : 'Loading...'}</h1>
          </TitleLine>
          <Line>
            <Category>분류</Category>
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
          <TitleLine style={{borderRadius:'4px',
          opacity: 'var(--sds-size-stroke-border',
          background: 'var(--gray-50, #C4C4C4',
          color : 'white',
          height: '30px',
          padding : '10px'}}>
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
              <CiSquarePlus size={30} onClick={addChecklist} />
            </Line>
          </CheckLists>
          <DateInfo style={{ width: '15%', marginLeft: '82%' }} onClick={updateBingo}>저장하기</DateInfo>
        </RightDom>
      </Body>
      <FooterHook />
    </>
  );
};

export default MadeDragBingo;

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

const DateInfo = styled.div`

opacity: var(--sds-size-stroke-border);
background: var(--gray-pri, #515151);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  color: rgba(30, 58, 138, 0.6);
  
  color: white;
  border-radius: 10px;
  padding: 8px;
  gap: 5px;
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

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-left: 10px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  color: rgba(30, 58, 138, 1);
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