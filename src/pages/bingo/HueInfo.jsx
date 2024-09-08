import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { Body } from './Home';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { Category, Line } from './MadeBingo';
import { ReviewDom, Review, RightDom, TitleLine } from './BingoInfo';
import { getHueInfo } from '../../apis/testapis';
import Bingomain from './Bingomain';
//홈화면의 휴알유 추천 페이지 사실 하나만 있어도 되는데 2개만 있어서 두가지를 나눠서 해주었습니다.. 시간있으면 쿼리로 할 것
const HueInfo = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommend] = useState([]);
  const [title, setTitle] = useState('');
  const [largeCategory, setLargeCategory] = useState('');
  const [content, setContent] = useState([]);
  const [images, setImages] = useState([]);
  //뒤로가기 버튼
  const goHome = () => {
    navigate("/view");
  }
  //get으로 받아온 정보들 선언 후 띄우기
  const viewRecommend = async () => {
    const response = await getHueInfo();
    const recommendations = response.map(item => ({
      id: item.information_idid,
      title: item.title,
      large_category: item.large_category,
      content: item.content,
      images: item.images.map(image => image.image) || [],
    }));
    setRecommend(recommendations);
    //원래 두개인데 [0]만 띄우게함
    if (recommendations.length > 0) {
      setTitle(recommendations[0].title);
      setLargeCategory(recommendations[0].large_category);
      setContent(recommendations[0].content ? recommendations[0].content.split('\n') : []);
      setImages(recommendations[0].images);
    }
  }

  useEffect(() => {
    viewRecommend();
  }, [title]);

  return (
    <>
      <HeaderHook />
      <Body>
        <Bingomain />
        <RightDom>
          <TitleLine>
            <MdOutlineKeyboardBackspace onClick={goHome} size={30} />
            <BsThreeDots size={30} />
          </TitleLine>
          <TitleLine>
            <h1>{title}</h1>
          </TitleLine>
          <Line>
            <Category>분류</Category>
            <Category style={{  color: 'white' ,
              border:'none',
              opacity: 'var(--sds-size-stroke-border)',
              background: 'linear-gradient(142deg, #FFF -204.94%, #1E3A8A 93.49%)',
              boxShadow: '-4px -4px 5px 0px rgba(81, 81, 81, 0.25) inset'
            }}>휴알유</Category>
            </Line>
          <Line>
            {Array.isArray(content) && content.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </Line>
          <ReviewDom>
            {images.length > 0 && images.map((image, index) => (
              <Review key={index} style={{border:'none'}}>
                <img src={image} alt={`Recommendation ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
              </Review>
            ))}
          </ReviewDom>
        </RightDom>
      </Body>
      <FooterHook />
    </>
  );
}

export default HueInfo;
