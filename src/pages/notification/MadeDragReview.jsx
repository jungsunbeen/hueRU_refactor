import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { getBingoloc } from '../../apis/testapis';
import { postReview } from '../../apis/reviewapis';
import check from '../../images/FiCheck.png';

const MadeDragReview = () => {
  const { location } = useParams();
  const [info, setInfo] = useState(null);
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState([]);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');
  const [procedure, setProcedure] = useState('');

  const navigate = useNavigate();

    const getReview = async(location) => {
      try {
        const response = await getBingoloc(location);
        const todo = response.todo.map((item) => ({
          title: item.title,
          id: item.id,
        }));
        const info = {
          title: response.bingo_item.title,
          large_category_display: response.bingo_item.large_category_display,
          large_category: response.bingo_item.large_category,
          start_date: response.bingo_item.start_date,
          end_date: response.bingo_item.end_date,
          duty: response.bingo_item.duty,
          employment_form: response.bingo_item.employment_form,
          area: response.bingo_item.area,
          host: response.bingo_item.host,
          app_fee: response.bingo_item.app_fee,
          date: response.bingo_item.date,
          app_due: response.bingo_item.app_due,
          field: response.bingo_item.field,
          procedure: response.bingo_item.procedure,
          author: response.bingo_item.author,
          created_at: response.bingo_item.created_at,
        };
        setTitle(info.title);
        setTodo(todo);
        setInfo(info);
        const images = response.images ? response.images.map((item) => ({
          image_id: item.image_id,
          image: item.image,
        })) : [];
        setImages(images);
      } catch (error) {
        console.error('Error in getNotice:', error.response ? error.response.data : error.message);
        throw error;
      }
    };

    const postReviews = async (data) => {
      try {
        const data = {
          large_category: info.large_category,
          space_location: location,
          content: content,
          images:'',
          procedure: procedure,
        };
        const response = await postReview(data);
        console.log(response);
        navigate('/view');
      } catch (error) {
        console.error('Error in postReview:', error.response ? error.response.data : error.message);
        throw error;
      }
    }

  useEffect(() => {
      getReview(location);
  }, [location]);


  const goBingo = () => {
    navigate('/view');
  };

  return (
    <>
      <HeaderHook />
      <Line style={{ color: 'rgba(27, 52, 124, 1)', justifyContent: 'space-between', padding: '2%' }}>
        <MdOutlineKeyboardBackspace onClick={goBingo} size={40} style={{marginLeft: '5%', padidngTop: '5%'}}/>
      </Line>
      <BigBody>
        <Body>
          <TitleLine>
            <StyledTitle>{info ? `| ${info.title}` : 'Loading...'}</StyledTitle>
          </TitleLine>
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
                <span>{info.host}</span>
              </Line>
            )}
            {info && info.field && (
              <Line>
                <Category>활동 분야</Category>
                <span>{info.field}</span>
              </Line>
            )}
            {info && info.app_fee && (
              <Line>
                <Category>응시료</Category>
                <span>{info.app_fee}원</span>
              </Line>
            )}
            {info && info.duty && (
              <Line>
                <Category>직무</Category>
                <span>{info.duty}</span>
              </Line>
            )}
            {info && info.employment_form && (
              <Line>
                <Category>채용 형태</Category>
                <span>{info.employment_form}</span>
              </Line>
            )}
            {info && info.area && (
              <Line>
                <Category>활동 지역</Category>
                <span>{info.area}</span>
              </Line>
            )}
            {info && info.app_due && (
              <Line>
                <Category>지원 마감</Category>
                <span>{info.app_due}</span>
              </Line>
            )}
            {info && info.prep_period && (
              <Line>
                <Category>준비 기간</Category>
                <span>{info.prep_period}</span>
              </Line>
            )}
            {info && info.start_date && (
              <Line>
                <Category>활동 기간</Category>
                <span>{info.start_date} ~ {info.end_date}</span>
              </Line>
            )}
          </InfoDom>
          <ReviewDom>
            <Line>
              <ReviewLabel>세부 계획</ReviewLabel>
              <ReviewContent>
                {todo.map((item) => (
                    <CheckLists>
                      <img src={check} style={{width: '20px', height: '20px'}} />
                      <div>{item.title}</div>
                    </CheckLists>
                ))}
              </ReviewContent>
            </Line>
            <Line>
              <ReviewLabel>시험 절차</ReviewLabel>
              <InputBox
                  type="text"
                  value={procedure}
                  onChange={(e) => setProcedure(e.target.value)}
                  placeholder="시험 절차를 입력하세요"/>
            </Line>
            <Line>
              <ReviewLabel>활동 내용/합격 팁/소감</ReviewLabel>
              <InputBox
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="준비 과정 및 소감을 입력하세요" />
            </Line>
          </ReviewDom>
          <Reviewbutton>
            <button onClick={postReviews}>목표 달성 기록 남기기</button>
          </Reviewbutton>
        </Body>
      </BigBody>
      <FooterHook />
    </>
  )
};

export default MadeDragReview;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  span {
    font-size: 16px;
    font-weight: 700;
  }
`;

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const CheckLists = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 700;
  img {
    margin-right: 10px;
  }
  div {
    margin-bottom: 20px;
  }
`;

const ReviewDom = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 30px;
  width: 100%;
  padding-bottom: 4%;
`

const ReviewLabel = styled.div`
  display: flex;
  align-items: start;
  width: 30%;
  font-size: 20px;
  font-weight: 700;
  color: rgba(27, 52, 124, 1);
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const BigBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  margin: auto;
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding: 0 50px 50px 50px;
  margin-bottom: 10%;
`
const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: rgba(27, 52, 124, 1);
  margin-bottom: 5%;
`
const Infobutton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: white;
  border: none;
  background-color: rgba(30, 58, 138, 1);
  width: 60px;
  height: 30px;
  border-radius: 8px;
`;

const InfoDom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  padding-top: 4%;
  padding-bottom: 4%;
`

const Category = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  font-size: 20px;
  font-weight: 700;
  color: rgba(27, 52, 124, 1);
`

const InputBox = styled.input`
  color: rgba(142, 156, 196, 1);
  border: 0.4px solid rgba(142, 156, 196, 1);
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
  height: 160px;
  width: 460px;
  &::placeholder{
    color: rgba(142, 156, 196, 1);
  }
`;

const Reviewbutton = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 10%;
  margin-top: 10%;
  button {
    width: 250px;
    height: 44px;
    background-color: rgba(27, 52, 124, 1);
    border-radius: 10px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
`;