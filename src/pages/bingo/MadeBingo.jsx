import React, { useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import styled from 'styled-components';
import { Body } from './Home';
import { RightDom } from './BingoInfo';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { CiSquarePlus } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import CustomCalendar from './CustomCalendar';
import { useRecoilState } from 'recoil';
import { bingoState, bingoObjectState } from '../../recoil/atoms';
import Bingomain2 from './Bingomain2';

const MadeBingo = () => {
  const navigate = useNavigate();
  const { location } = useParams();
  const [checklists, setChecklists] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [title, setTitle] = useState('');
  const [examDates, setExamDates] = useState([null, null]);
  const [prepDates, setPrepDates] = useState([null, null]);
  const [bingos, setBingos] = useRecoilState(bingoState);
  const [bingoObject, setBingoObject] = useRecoilState(bingoObjectState);

  const goHome = () => {
    updateBingo();
    navigate(`/bingo`);
  };

  const categories = ["채용(인턴)", "자격증", "대외활동", "공모전", "취미", "여행", "자기계발", "휴식"];
  const subcategories = {
    "채용(인턴)": ["직무", "채용형태", "근무 지역", "지원 마감"],
    "자격증": ["주최사", "응시료", "시험 날짜", "준비 기간"],
    "대외활동": ["활동 분야", "활동 지역", "활동 기간", "지원 마감"],
    "공모전": ["주최 기관", "공모 분야", "마감일", "준비 기간"],
    "취미": ["분야", "파트너", "기간"],
    "여행": ["장소", "파트너", "기간"],
    "자기계발": ["분야", "파트너", "기간"],
    "휴식": ["장소", "기간"]
  };
  const categoryMap = {
    "채용(인턴)": "CAREER",
    "자격증": "CERTIFICATE",
    "대외활동": "OUTBOUND",
    "공모전": "CONTEST",
    "취미": "HOBBY",
    "여행": "TRAVEL",
    "자기계발": "SELFIMPROVEMENT",
    "휴식": "REST",
    "휴알유": "information",
  };

  const inputConfigs = {
    "채용(인턴)": [
      { placeholder: "직무", type: "select", options: ["영업/고객상담", "경영/사무/회계", "마케팅/광고/홍보", "생산/제조", "연구개발/설계", "IT", "서비스", "무역/유통", "의료", "건설", "교육", "디자인", "전문/특수", "미디어", "기타"] },
      { placeholder: "채용형태", type: "select", options: ["신입", "경력", "계약직", "인턴", "아르바이트"] },
      { placeholder: "근무 지역", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "비대면"] },
      { placeholder: "지원 마감", type: "date" }
    ],
    "자격증": [
      { placeholder: "주최사" },
      { placeholder: "응시료" },
      { placeholder: "시험 날짜", type: "date" },
      { placeholder: "준비 기간", type: "date-range" }
    ],
    "대외활동": [
      { placeholder: "활동 분야", type: "select", options: ["봉사", "기자단", "홍보단(서포터즈)", "강연", "멘토링", "모임(동아리)", "해외탐방", "기타"] },
      { placeholder: "활동 지역", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "비대면"] },
      { placeholder: "지원 마감", type: "date" },
      { placeholder: "활동 기간", type: "date-range" }
    ],
    "공모전": [
      { placeholder: "주최 기관" },
      { placeholder: "공모 분야", type: "select", options: ["기획/아이디어", "광고/마케팅", "사진/영상", "디자인/순수미술", "캐릭터/만화/게임", "공간/건축", "과학/공학", "예체능", "학술", "창업", "기타"] },
      { placeholder: "마감일", type: "date" },
      { placeholder: "준비 기간", type: "date-range" }
    ],
    "취미": [
      { placeholder: "분야", type: "select", options: ["그림 및 공예", "음악", "운동", "레저 및 야외 활동", "요리 및 베이킹", "독서 및 글쓰기", "원예", "기타"] },
      { placeholder: "파트너", type: "select", options: ["혼자", "친구와", "가족과", "애인과", "기타"] },
      { placeholder: "기간", type: "date-range" }
    ],
    "여행": [
      { placeholder: "장소", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "해외"] },
      { placeholder: "파트너", type: "select", options: ["혼자", "친구와", "가족과", "애인과", "기타"] },
      { placeholder: "기간", type: "date-range" }
    ],
    "자기계발": [
      { placeholder: "분야", type: "select", options: ["언어", "독서", "자격증", "전문 기술", "재정 관리", "건강 관리", "네트워킹", "기타"] },
      { placeholder: "파트너", type: "select", options: ["혼자", "친구와", "가족과", "애인과", "기타"] },
      { placeholder: "기간", type: "date-range" }
    ],
    "휴식": [
      { placeholder: "장소", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "해외"] },
      { placeholder: "기간", type: "date-range" }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addChecklist = () => {
    if (newChecklistText.trim() === '') return;
    const newChecklist = { id: checklists.length + 1, text : newChecklistText };
    setChecklists([...checklists, newChecklist]);
    setNewChecklistText('');
  };

  const deleteCheckList = (id) => {
    const updatedChecklists = checklists.filter(item => item.id !== id);
    setChecklists(updatedChecklists);
  };

  const handleExamDateChange = (dates) => {
    setExamDates(dates);
  };

  const handlePrepDateChange = (dates) => {
    setPrepDates(dates);
  };

  const updateBingo = () => {
    const locationIndex = location.toString();
    const updatedBingoObj = JSON.parse(JSON.stringify(bingoObject.bingo_obj));

    updatedBingoObj[locationIndex] = {
      ...updatedBingoObj[locationIndex],
      id: "",
      todo: checklists.map(item => ({ title: item.text })),
      title: title,
      choice: "0",
      large_category: categoryMap[selectedCategory],
    };

    setBingos(prevState => {
      const updatedBingos = [...prevState];
      updatedBingos[locationIndex] = { location: locationIndex, title: title };
      return updatedBingos;
    });

    setBingoObject(prevState => ({
      ...prevState,
      bingo_obj: updatedBingoObj,
    }));
    console.log(bingoObject);
    console.log(bingos);
    navigate('/bingo');
  };


  return (
    <>
      <HeaderHook />
      <Body>
        <Bingomain2 />
        <RightDom style={{paddingTop : '20px'}}>
          <TitleLine>
            <MdOutlineKeyboardBackspace onClick={goHome} size={30} />
            <BsThreeDots size={30} />
          </TitleLine>
          <Line>
            <InputTitleBox
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </Line>
          <Line style={{ gap: '60px' }}>
            <Row>
              <Category>분류</Category>
              {subcategories[selectedCategory].map((item, index) => (
                <Category key={index}>{item}</Category>
              ))}
            </Row>
            <Row>
              <SelectorCategory value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </SelectorCategory>
              {inputConfigs[selectedCategory].map((config, index) => {
                if (config.type === 'date') {
                  return (
                    <DateInfo key={index}>
                      {examDates[0] && examDates[1]
                        ? `${examDates[0].toLocaleDateString()}`
                        : '날짜를 입력하세요.'}
                      <CustomCalendar onChange={handleExamDateChange} value={examDates} />
                    </DateInfo>
                  );
                } else if (config.type === 'date-range') {
                  return (
                    <DateInfo key={index}>
                      {prepDates[0] && prepDates[1]
                        ? `${prepDates[0].toLocaleDateString()} ~ ${prepDates[1].toLocaleDateString()}`
                        : '날짜를 입력하세요.'}
                      <CustomCalendar onChange={handlePrepDateChange} value={prepDates} />
                    </DateInfo>
                  );
                } else if (config.type === 'select') {
                  return (
                    <SelectorCategory key={index}>
                      {config.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </SelectorCategory>
                  );
                } else {
                  return (
                    <InputInfoBox
                      key={index}
                      type="text"
                      placeholder={config.placeholder}
                    />
                  );
                }
              })}
            </Row>
          </Line>
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
                <span>{item.text}</span>
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
          <DateInfo style={{ width: '30px', marginLeft: '90%' }} onClick={updateBingo}>
            저장
          </DateInfo>
        </RightDom>
      </Body>
      <FooterHook />
    </>
  );
};

export default MadeBingo;

export const Category = styled.div`
  border-radius: 8px;
  border: 0.4px solid var(--main-30, #BCC4DC);
  opacity: var(--sds-size-stroke-border);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  color: rgba(81, 81, 81, 1);
  background: white;
  border-radius: 10px;
  padding: 7px;
`;

export const DateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  width: 210px;
  border: 0.2px solid rgba(30, 58, 138, 1);
  color: rgba(81, 81, 81, 1);
  border-radius: 10px;
  padding: 8px;
  gap: 5px;
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
  margin-left: 10px;
  color: rgba(81, 81, 81, 1);
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;
  gap: 20px;
  color: rgba(81, 81, 81, 1);
`
export const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  background: white;
  margin-bottom: 15px;
  margin-left: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
  top: 0; /* Add this line */
  color: rgba(81, 81, 81, 1);
`;

export const CheckLists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  background: white;
  border-radius: 10px;
  padding: 10px;
  color: rgba(81, 81, 81, 1);
`;

export const CheckList = styled.div`
  display: flex;
  align-items: center;
  color: rgba(81, 81, 81, 1);
  gap: 10px;
  color: ${(props) => (props.checked ? 'rgba(30, 58, 138, 0.5)' : 'rgba(30, 58, 138, 1)')};
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
`;

export const CheckBox = styled.div`
  width: 14px;
  height: 14px;
  border: 1.2px solid rgba(30, 58, 138, 1);
  margin: 2px;
  color: rgba(81, 81, 81, 1);
`;

export const InputBox = styled.input`
  padding: 0 12px;
  border-radius: 8px;
  color: rgba(81, 81, 81, 1);
  border: 0.2px solid rgba(30, 58, 138, 1);
  height: 30px;
  width: 80%;
  margin-top: 10px;
`;

const InputTitleBox = styled.input`
  border: none;
  
  font-size: 24px;
  color: rgba(81, 81, 81, 1);
  width: 100%;
`
const Selector = styled.select`
  font-size: 15px;
  padding: 10px;
  border-radius: 10px;
  width: 110px;
  border: none;
  background: rgba(30, 58, 138, 1);
  color: white;
`

const InputInfoBox = styled.input`
  border: none;
  font-size: 20px;
  height: 20px;
  color: rgba(30, 58, 138, 1);
  // background: rgba(246, 247, 251, 1);
  ::placeholder {
    color: rgba(30, 58, 138, 0.5);
    font-size: 20px;
  }
  margin-top: 12px;
`
const SelectorCategory = styled.select`
  font-size: 15px;
  padding: 6px;
  width: 225px;
  border-radius: 8px;
  color : rgba(246, 247, 251, 1);
  // border: 0.4px solid var(--main-40, #A5B0D0);
  opacity: var(--sds-size-stroke-border);
  color: rgba(30, 58, 138, 1);
`