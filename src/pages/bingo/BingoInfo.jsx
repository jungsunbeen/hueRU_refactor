import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace, MdOutlineNearMe } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Body } from './Home';
import HeaderHook from '../../components/HeaderHook';
import { getInfo, getReviewInInfo } from '../../apis/testapis';
import { Category } from './MadeBingo';
import Bingomain from './Bingomain';
import FooterHook from '../../components/FooterHook';
import { Content, PhotoBox, UserDom, WriterDom } from '../notification/Noti';

const BingoInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [review, setReview] = useState([]);
  const [isNotice, setIsNotice] = useState(false);
  const [title, setTitle]= useState('');
  //뒤로가기 버튼
  const goHome = () => {
    navigate("/view");
  };
  //정보 띄우는 함수
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
        is_notice: response.is_notice,
        notice_id: response.notice_id,
        author:response.author,
        created_at:response.created_at,
      };
      setTitle(info.title);
      setInfo(info);
      setIsNotice(info.is_notice);
      // console.log(info);
      // console.log(response);
    } catch (error) {
      console.error('Error in getInfos:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  // 리뷰 띄우는 함수
  const getReview = async (id) => {
    try {
      const response = await getReviewInInfo(id);
      const review = response.data.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.images[0]?.image || '',
        author:item.author,
        created_at:item.created_at,
      }));
      setReview(review);
      // console.log(response);
      // console.log(review);
    } catch (error) {
      console.error('Error in getReview:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  const goNotice = (id) => {
    navigate(`/viewnotice/${id}`);
  }

  const goReview = (id) => {
    navigate(`/viewreview/${id}`);
  }
  
  useEffect(() => {
    if (id) {
      getInfos(id);
      getReview(id);
    }
  }, [id]);

  return (
    <>
      <HeaderHook />
      <Body>
        <Bingomain/>
        <RightDom>
          <TitleLine>
            <MdOutlineKeyboardBackspace onClick={goHome} size={30} />
            {isNotice && (
              <DateInfo onClick={()=> goNotice(info.notice_id)}>더 많은 정보 보러가기<MdOutlineNearMe size={20}/> </DateInfo>
            )}
          </TitleLine>
          <TitleLine style={{marginTop:'0'}}>
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
          {/* 있을 시에 띄워줌 */}
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
          <TitleLine>
            <h3>[{title}] 빙고 미션 완료 후기</h3>
          </TitleLine>
          <ReviewDom>
            {/* 리뷰 map */}
              {review.map((item) => (
                <Content key={item.id}>
                  <WriterDom>
                    <UserDom>
                      <div style={{fontSize: '16px', fontWeight:'700', marginLeft: '10px'}}>{item.author}</div>
                      <div style={{fontSize: '13px', fontWeight:'500', color: 'rgba(116, 116, 116, 1)'}}>{item.created_at}</div>
                    </UserDom>
                  </WriterDom>
                  <PhotoBox>
                    <img src={item.image} alt={item.title} onClick={() => goReview(item.id)} />
                  </PhotoBox>
                  <div style={{fontSize: '16px', fontWeight: '700', marginLeft: '3%', marginTop: '5%'}}>{item.title}</div>
                </Content>
              ))}
            {/* {review.map((item) => (
              <Review key={item.id}
               onClick={()=>goReview(item.id)}>
                <img src={item.image} alt={item.title} style={{ width: '90%', height: '80%', borderRadius: '10px' }} />
                <div>{item.title}</div>
              </Review> */}
            {/* ))} */}
          </ReviewDom>
        </RightDom>
      </Body>
      <FooterHook />
    </>
  );
};

export default BingoInfo;

export const Car = styled.div`
display: flex;
width : 100px;
// padding-left : 10px;
`

export const RightDom = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 630px;
  gap: 15px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  overflow-x: auto;

  border-radius: 10px;
border: 0.4px solid var(--gray-40, #C4C4C4);
opacity: var(--sds-size-stroke-border);
// background: #FFF;
box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;

export const DateInfo = styled.div`
color : white;
border-radius: 8px;
opacity: var(--sds-size-stroke-border);
background: #A5B0D0;
box-shadow: 2px 2px 4px 0px #D9D9D9 inset, -4px -4px 5px 0px rgba(81, 81, 81, 0.25) inset;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
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
`;

export const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top : 20px;
  margin-left: 10px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 1;
  // padding-top: 10px;
`;

export const ReviewDom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 70%;
  flex-shrink: 0;
  border-radius: 10px;
  gap: 10px;
  padding: 10px;
  overflow-y: auto;
`;

export const Review = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 50%;
  height: 70%;
  object-fit: contain;
  padding-top : 1%;
  gap: 5px;
  border: 1px solid rgba(30, 58, 138, 0.5);
  border-radius: 10px;
`;
