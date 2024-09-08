import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Line} from '../bingo/MadeBingo';
import HeaderHook from '../../components/HeaderHook';
import FooterHook from '../../components/FooterHook';
import CustomCalendar from '../bingo/CustomCalendar';
import { CiSquarePlus } from 'react-icons/ci';
import { postMyReview } from '../../apis/reviewapis';
import { FiCheck } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MadeReview = () => {
  const categorys = ["채용(인턴)", "자격증", "대외활동", "공모전", "취미", "여행", "자기계발", "휴식"];
  // const subcategories = {
  //   "채용(인턴)": ["직무", "채용형태", "근무 지역", "지원 마감","채용 절차","준비 과정/소감"],
  //   "자격증": ["주최사", "응시료", "시험 날짜", "준비 기간","시험 절차","준비 과정/공부 팁/소감"],
  //   "대외활동": ["활동 분야", "활동 지역", "활동 기간", "지원 마감","모집 절차","준비 과정/합겹 팁/활동 내용/소감"],
  //   "공모전": ["주최 기관", "공모 분야", "마감일", "준비 기간","준비 내용/수상 팁/소감"],
  //   "취미": ["분야", "파트너", "기간","소감"],
  //   "여행": ["장소", "파트너", "기간","소감"],
  //   "자기계발": ["분야", "파트너", "기간","소감"],
  //   "휴식": ["장소", "기간","소감"]
  // };  
  const categoryMap = {
    "채용(인턴)": "CAREER",
    "자격증": "CERTIFICATE",
    "대외활동": "OUTBOUND",
    "공모전": "CONTEST",
    "취미": "HOBBY",
    "여행": "TRAVEL",
    "자기계발": "SELFIMPROVEMENT",
    "휴식": "REST",
  };

  const inputConfigs = {
    "채용(인턴)": [
      { placeholder: "직무", type: "select", options: ["영업/고객상담", "경영/사무/회계", "마케팅/광고/홍보", "생산/제조", "연구개발/설계", "IT", "서비스", "무역/유통", "의료", "건설", "교육", "디자인", "전문/특수", "미디어", "기타"] },
      { placeholder: "채용형태", type: "select", options: ["신입", "경력", "계약직", "인턴", "아르바이트"] },
      { placeholder: "근무 지역", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "비대면"] },
      { placeholder: "근무 기간", type: "date-range" },
      { placeholder: "채용 절차", type : "procedure-text" },
      { placeholder: "준비 과정/소감", type: "bigtext" }
    ],
    "자격증": [
      { placeholder: "주최사" },
      { placeholder: "응시료" },
      { placeholder: "시험 날짜", type: "date" },
      { placeholder: "준비 기간", type: "date-range" },
      { placeholder: "시험 절차", type : "procedure-text" },
      { placeholder: "준비 과정/공부 팁/소감", type: "bigtext" }
    ],
    "대외활동": [
      { placeholder: "활동 분야", type: "select", options: ["봉사", "기자단", "홍보단(서포터즈)", "강연", "멘토링", "모임(동아리)", "해외탐방", "기타"] },
      { placeholder: "활동 지역", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "비대면"] },
      // { placeholder: "지원 마감", type: "date" },
      { placeholder: "활동 기간", type: "date-range" },
      { placeholder: "모집 절차", type : "procedure-text" },
      { placeholder: "준비 과정/합격 팁/활동 내용/소감", type: "bigtext"}
      
    ],
    "공모전": [
      { placeholder: "주최 기관" },
      { placeholder: "공모 분야", type: "select", options: ["기획/아이디어", "광고/마케팅", "사진/영상", "디자인/순수미술", "캐릭터/만화/게임", "공간/건축", "과학/공학", "예체능", "학술", "창업", "기타"] },
      { placeholder: "마감일", type: "date" },
      { placeholder: "준비 기간", type: "date-range" },
      { placeholder: "모집 절차", type : "procedure-text" },
      { placeholder: "준비 내용/수상 팁/소감", type: "bigtext" }
    ],
    "취미": [
      { placeholder: "분야" ,type: "select", options: ["그림 및 공예", "음악", "운동", "레저 및 야외 활동", "요리 및 베이킹", "독서 및 글쓰기", "원예", "기타"]},
      { placeholder: "파트너", type: "select", options:["혼자", "친구와", "가족과", "애인과", "기타"]},
      { placeholder: "기간", type: "date-range" },
      { placeholder: "소감", type: "bigtext" }
    ],
    "여행": [
      { placeholder: "장소", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "해외"] },
      { placeholder: "파트너", type: "select", options:["혼자", "친구와", "가족과", "애인과", "기타"]},
      { placeholder: "기간", type: "date-range" },
      { placeholder: "소감", type: "bigtext" }
    ],
    "자기계발": [
      { placeholder: "분야", type: "select", options:["언어", "독서", "자격증", "전문 기술", "재정 관리", "건강 관리", "네트워킹", "기타"] },
      { placeholder: "파트너", type: "select", options:["혼자", "친구와", "가족과", "애인과", "기타"]},
      { placeholder: "기간", type: "date-range" }, 
      { placeholder: "소감", type: "bigtext" }
    ],
    "휴식": [
      { placeholder: "장소", type: "select", options: ["서울", "경기(인천, 세종)", "강원", "충청(대전)", "전라(광주)", "경상(대구, 울산, 부산)", "제주", "해외"] },
      { placeholder: "기간", type: "date-range" }, 
      { placeholder: "소감", type: "bigtext" }
    ]
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState(categorys[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [procedure, setProcedure] = useState('');
  const [examDates, setExamDates] = useState([null, null]);
  const [prepDates, setPrepDates] = useState([null, null]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  const formatDateString = (date) => {
    const formattedDate = date.toLocaleDateString();
    const [year, month, day] = formattedDate.split('.').map(element => element.trim());
    return `${year}.${month.length === 2 ? month : '0' + month}.${day.length === 2 ? day : '0' + day}`;
  };

  const handleExamDateChange = (dates) => {
    setExamDates(dates);
  };

  const handlePrepDateChange = (dates) => {
    setPrepDates(dates);
  };

  const handleSelectChange = (placeholder, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [placeholder]: value,
    });
  };

  const [checklists, setChecklists] = useState([]);
  const [newChecklistText, setNewChecklistText] = useState('');

  const madeCheckList = () => {
    if (newChecklistText.trim() === '') return;
    const newChecklist = { id: checklists.length + 1, text: newChecklistText, checked: false };
    setChecklists([...checklists, newChecklist]);
    setNewChecklistText('');
  };

  const postReview = async () => {
    try {
      let body = {
        large_category: categoryMap[selectedCategory],
        title: title,
        content: content,
        start_date: formatDateString(prepDates[0]),
        end_date: formatDateString(prepDates[1]),
        detailplans: checklists.map((item) => ({ content: item.text })),
      };
  
      switch (selectedCategory) {
        case "채용(인턴)":
          body.duty = selectedOptions["직무"];
          body.employment_form = selectedOptions["채용형태"];
          body.area = selectedOptions["근무 지역"];
          body.procedure = selectedOptions["채용 절차"];
          break;
  
        case "자격증":
          body.host = selectedOptions["주최사"];
          body.date = formatDateString(examDates[0]?.toLocaleDateString());
          body.procedure = selectedOptions["시험 절차"];
          body.app_fee = selectedOptions["응시료"];
          break;
  
        case "대외활동":
          body.field = selectedOptions["활동 분야"];
          body.area = selectedOptions["활동 지역"];
          body.procedure = selectedOptions["모집 절차"];
          break;
  
        case "공모전":
          body.host = selectedOptions["주최 기관"];
          body.field = selectedOptions["공모 분야"];
          body.app_due = formatDateString(examDates[0]?.toLocaleDateString());
          body.procedure = selectedOptions["모집 절차"];
          break;
  
        case "취미":
          body.field = selectedOptions["분야"];
          body.partner = selectedOptions["파트너"];
          break;
  
        case "여행":
          body.location = selectedOptions["장소"];
          body.partner = selectedOptions["파트너"];
          break;
  
        case "자기계발":
          body.field = selectedOptions["분야"];
          body.partner = selectedOptions["파트너"];
          break;
  
        case "휴식":
          body.location = selectedOptions["장소"];
          break;
  
        default:
          console.warn(`Unhandled category: ${selectedCategory}`);
          break;
      }
      const data = new FormData();

      const jsonFormData = JSON.stringify(body);
      data.append('json', jsonFormData);
  
      for (let pair of data.entries()) {
        console.log(pair[0] + ', ' + pair[1]); 
      }
  
      // const jsonFormData = JSON.stringify(body);
      // console.log(jsonFormData);
      // console.log(body);
      // const response = await postMyReview(jsonFormData);
      // const response = await postMyReview(body);
      const response = await postMyReview(data);
      // console.log(body);
      // console.log(response);
      // console.log(response.id);
      // const { id } = response.id;
      // navigate(`/viewreview/${id}`);
      alert('후기가 성공적으로 등록되었습니다.');
      navigate(`/notification`);
    } catch (error) {
      alert(`모든 항목을 입력해주세요.`);
      console.error("Error in postReview:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
    <HeaderHook></HeaderHook>
    <BigBody>
    <Body style={{padding:'80px'}}>
      <Row style={{marginBottom:'60px'}}>
        <div>후기/Review</div>
        <div style={{fontSize:'16px', color:'rgba(163, 163, 163, 1)'}}>휴학 전에 했던 활동 기록, 빙고판에 넣지 않았던 기타 에피소드를 남겨주세요</div>
      </Row>
        <Line>
          <Category>제목</Category>
          <InputBox
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"/>
          </Line>
              <Line>
                <Category>분류</Category>
                <Selector value={selectedCategory} onChange={handleCategoryChange}>
                  {categorys.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Selector>
              </Line>
              {inputConfigs[selectedCategory].map((config, index) => {
                if (config.type === 'date') {
                  return (
                    <Line>
                    <Category key={index}>{config.placeholder}</Category>
                    <DateInfo>
                      {examDates[0] && examDates[1] 
                        ? `${examDates[0].toLocaleDateString()}` : '날짜를 입력하세요.'}
                        <CustomCalendar onChange={handleExamDateChange} value={examDates} />
                    </DateInfo>
                    </Line>
                  );
                } else if (config.type === 'date-range') {
                  return (
                    <Line>
                    <Category key={index}>{config.placeholder}</Category>
                    <DateInfo>
                    {prepDates[0] && prepDates[1] 
                    ? `${prepDates[0].toLocaleDateString()} ~ ${prepDates[1].toLocaleDateString()}` : '기간을 입력하세요.'}
                    <CustomCalendar onChange={handlePrepDateChange} value={prepDates} />
                    </DateInfo>
                    </Line>
                  );
                } else if (config.type === 'select') {
                  return (
                    <Line key={index}>
                      <Category>{config.placeholder}</Category>
                      <Selector
                        value={selectedOptions[config.placeholder] || ''}
                        onChange={(e) => handleSelectChange(config.placeholder, e.target.value)}
                      >
                        {config.options.map((option, optIndex) => (
                          <option key={optIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </Selector>
                    </Line>
                  );
                } else if (config.type === 'bigtext'){
                  return(
                  <Line>
                    <Category key={index}>{config.placeholder}</Category>
                    <InputBox
                      key={index}
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={config.placeholder}
                      style={{height:'200px'}}/>
                  </Line>
                  );
                } else if (config.type === 'procedure-text'){
                  return(
                  <Line>
                    <Category key={index}>{config.placeholder}</Category>
                    <InputBox
                      key={index}
                      type="text"
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      placeholder={config.placeholder}/>
                  </Line>
                  );
              } else {
                  return (
                    <Line>
                    <Category key={index}>{config.placeholder}</Category>
                    <InputBox
                      key={index}
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={config.placeholder}/>
                    </Line>
                  );
                }
              })}
              <Line>
                <Category>체크리스트</Category>
                <CheckList>
                  {checklists.map((item) => (
                    <div key={item.id}>
                        <FiCheck size={15}/>
                      <span>{item.text}</span>
                    </div>
                  ))}
                <Line style={{flexDirection: 'row'}}>
                  <InputBox
                    type="text"
                    value={newChecklistText}
                    onChange={(e) => setNewChecklistText(e.target.value)}
                    placeholder="세부 계획을 입력하세요"
                    style={{width:'70%'}}
                  />
                  <CiSquarePlus size={30} onClick={madeCheckList} />
                </Line>
                </CheckList>
            </Line>
                <style> 
                {` 
                    ::placeholder { 
                        color: rgba(142, 156, 196, 1); 
                    }` 
                } 
                </style>
          {/* <PhotoDom>
            <div>사진</div>
            <div>사진</div>
            <div>사진</div>
          </PhotoDom> */}
          <Button onClick={postReview}>업로드</Button>
    </Body>
    </BigBody>
    <FooterHook />
    </>
  )
};

export default MadeReview

const BigBody = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color : rgba(27, 52, 124, 1);
`
const Body = styled.div`
  display : flex;
  flex-direction: column;
  justify-content: center;
  width : 40%;
  gap : 15%;
  // align-items: center;
  color : rgba(27, 52, 124, 1);
  font-size : 24px;
`

const CheckList = styled.div`
  display : flex;
  flex-direction : column;
  height : 70%;
  gap : 10px;
  font-size : 16px;
  padding : 10px;
`
const InputBox = styled.input`
  padding: 5px;
  border-radius: 10px;
  border: 0.2px solid rgba(142, 156, 196, 1);
  font-size :15px;
  width : 50%;
  color : rgba(142, 156, 196, 1);
`

const Selector = styled.select`
  border: 0.2px solid rgba(142, 156, 196, 1);
  font-size :15px;
  padding: 5px;
  border-radius: 10px;
  width : 260px;
  color: rgba(142, 156, 196, 1);
`

const DateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size :15px;
  height: 20px;
  width : 260px;
  padding: 5px;
  border-radius: 10px;
  border: 0.2px solid rgba(142, 156, 196, 1);
  color : rgba(142, 156, 196, 1);
  border-radius: 10px;
  // padding: 8px;
  gap: 5px;
`;

const Category = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  width : 200px;
  color : rgba(27, 52, 124, 1);
  font-size : 20px;
  // border : 0.2px solid rgba(142, 156, 196, 1);
`

const PhotoDom = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : center;
  width : 100%;
  gap : 5%;
`

const Button = styled.button`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 100px;
  height : 44px;
  border : none;
  border-radius : 10px;
  background-color : rgba(27, 52, 124, 1);
  color : white;
  font-size : 16px;
  margin-left : 95%;
`