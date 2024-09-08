import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import { Body } from './Home';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { Category, Line} from './MadeBingo';
import { ReviewDom, Review, RightDom, TitleLine } from './BingoInfo';
import { getHueInfo } from '../../apis/testapis';
import Bingomain from './Bingomain';

const HueInfo = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommend] = useState([]);
  const [title, setTitle] = useState('');
  const [largeCategory, setLargeCategory] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const goHome = () => {
    navigate("/view");
  }

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

    if (recommendations.length > 0) {
      setTitle(recommendations[1].title);
      setLargeCategory(recommendations[1].large_category);
      setContent(recommendations[1].content ? recommendations[1].content.split('\n') : []);
      setImages(recommendations[1].images);
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
