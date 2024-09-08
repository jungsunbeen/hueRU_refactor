import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { getHandleNoticeSaved, getNoticeById } from '../../apis/reviewapis';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

const viewHue = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [images, setImages] = useState([]);
  const [isStarred, setIsStarred] = useState(false);
  const [content, setContent] = useState([]);

  const getNotice = async (id) => {
    try {
      const response = await getNoticeById(id);
      const info = {
        id: response.id,
        title: response.title,
        large_category: response.large_category,
        start_date: response.start_date,
        end_date: response.end_date,
        content: response.content,
        duty: response.duty,
        employment_form: response.employment_form,
        area: response.area,
        host: response.host,
        app_fee: response.app_fee,
        date: response.date,
        app_due: response.app_due,
        field: response.field,
        procedure: response.procedure,
        likes: response.likes,
        large_category_display: response.large_category_display,
        author_id: response.author_id,
        author: response.author,
        created_at: response.created_at,
        profile: response.profile,
        saved : response.saved,
      };
      setInfo(info);
      setContent(info.content.split('\n'));
      setIsStarred(info.saved);

      const images = response.images ? response.images.map((item) => ({
        image_id: item.image_id,
        image: item.image,
      })) : [];
      setImages(images);
    } catch (error) {
      console.error('Error in getReview:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  useEffect(() => {
    if (id) {
      getNotice(id);
    }
  }, [id]);

  const navigate = useNavigate();
  const goNoti = () => { 
    navigate("/notification");
  }

  const handleStorage = async () => {
    try {
      await getHandleNoticeSaved(id);
      setIsStarred(!isStarred);
    } catch (error) {
      console.error('Error in getHandleLike:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  return (
    <>
      <HeaderHook />
      <Line style={{ color: 'rgba(27, 52, 124, 1)', justifyContent: 'space-between', padding: '2%' }}>
        <MdOutlineKeyboardBackspace onClick={goNoti} size={40} />
        <Line style={{ gap: '10%' }}>
          {isStarred ? (
          <AiFillStar 
            size={40} 
            onClick={handleStorage} 
            style={{ color: 'rgba(252, 211, 77, 1)' }} 
          />
          ):(
            <AiOutlineStar size={40} style={{ color: 'black' }} 
            onClick={handleStorage}/>
          )}
        </Line>
      </Line>
      <BigBody>
        <Body>
          <Line style={{ justifyContent: 'space-between' }}>
            <StyledTitle>{info ? info.title : 'Loading...'}</StyledTitle>
            <Line style={{ gap: '3%' }}>
              <Infobutton>{info ? info.author : ''}</Infobutton>
              <Infobutton>{info ? info.large_category_display : ''}</Infobutton>
            </Line>
          </Line>
          <InfoDom>
            {info && info.large_category_display ? (
              <Line>
                <Category>분류</Category>
                <Infobutton>{info.large_category_display}</Infobutton>
              </Line>
            ) : null}
            {info && info.host && (
              <Line>
                <Category>주최사</Category>
                <div>{info.host}</div>
              </Line>
            )}
            {info && info.field && (
              <Line>
                <Category>활동 분야</Category>
                <div>{info.field}</div>
              </Line>
            )}
            {info && info.app_fee && (
              <Line>
                <Category>응시료</Category>
                <div>{info.app_fee}원</div>
              </Line>
            )}
            {info && info.duty && (
              <Line>
                <Category>직무</Category>
                <div>{info.duty}</div>
              </Line>
            )}
            {info && info.employment_form && (
              <Line>
                <Category>채용 형태</Category>
                <div>{info.employment_form}</div>
              </Line>
            )}
            {info && info.area && (
              <Line>
                <Category>활동 지역</Category>
                <div>{info.area}</div>
              </Line>
            )}
            {info && info.app_due && (
              <Line>
                <Category>지원 마감</Category>
                <div>{info.app_due}</div>
              </Line>
            )}
            {info && info.prep_period && (
              <Line>
                <Category>준비 기간</Category>
                <div>{info.prep_period}</div>
              </Line>
            )}
            {info && info.start_date && (
              <Line>
                <Category>활동 기간</Category>
                <div>{info.start_date} ~ {info.end_date}</div>
              </Line>
            )}
          </InfoDom>
          <ReviewDom>
            {info && info.content && (
              <>
                {info.large_category_display === "자격증" ? (
                  <>
                    <Category2>세부 내용</Category2>
                    {content.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </>
                ) : (
                  <>
                    <Category2>세부 공고</Category2>
                    {content.map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </>
                )}
              </>
            )}
          </ReviewDom>
          <PhotoDom>
            {images && images.map((item) => (
              <img key={item.image_id} src={item.image} alt="사진" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
            ))}
          </PhotoDom>
        </Body>
      </BigBody>
      <FooterHook />
    </>
  )
};

export default viewHue;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`
const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const ReviewDom = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2%;
  padding-left: 21%;
  padding-right: 21%;
  width: 60%;
  gap: 30px;
`

const BigBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding: 50px; // Adjusted from 50% to 50px
  margin-bottom: 10%;
`
const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: rgba(27, 52, 124, 1);
`
const Infobutton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: rgba(81, 81, 81, 1);
  min-width: 100px;
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  border: 0.2px solid rgba(81, 81, 81, 1);
  border-radius: 10px;
`

const InfoDom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  border-top: 1px solid rgba(142, 156, 196, 1);
  border-bottom: 1px solid rgba(142, 156, 196, 1);
  padding-top: 4%;
  padding-bottom: 4%;
`

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  font-size: 24px;
  color: rgba(27, 52, 124, 1);
`
const Category2 = styled.div`
  font-size: 24px;
  color: rgba(27, 52, 124, 1);
`
const PhotoDom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 5%;
  margin-top: 5%;
`
