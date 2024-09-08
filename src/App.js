import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/bingo/Home';
import Index from './pages/bingo/Index';
import Login from './pages/login/Login';
import Test from './pages/typetest/Test';
import Test1 from './pages/typetest/Test1';
import Test2 from './pages/typetest/Test2';
import Test3 from './pages/typetest/Test3';
import Result from './pages/typetest/Result';
import Signup from './pages/login/Signup';
import { useState } from 'react';
import MadeBingo from './pages/bingo/MadeBingo';
import BingoInfo from './pages/bingo/BingoInfo';
import Calendar from 'react-calendar';
import ReadPortfolio from './pages/portFolio/ReadPortfolio';
import ChangePortfolio from './pages/portFolio/ChangePortfolio';
import MadeReview from './pages/notification/MadeReview';
import MadeDragReview from './pages/notification/MadeDragReview';
import MyPage from './pages/myPage/MyPage';
import Alarm from './pages/myPage/Alarm';
import AlarmManage from './pages/myPage/AlarmManage';
import Noti from './pages/notification/Noti';
import HueInfo from './pages/bingo/HueInfo';
import HueInfo2 from './pages/bingo/HueInfo2';
import MadeDragBingo from './pages/bingo/MadeDragBingo';
import MadedBingo from './pages/bingo/MadedBingo';
import { RecoilRoot } from 'recoil';
import ViewReview from './pages/notification/viewReview';
import ViewNotice from './pages/notification/viewNotice';
import Introduce from './pages/Introduce';
import MadedBingoEdit from './pages/bingo/MadedBingoEdit';
import ViewResult from './pages/typetest/ViewResult';
import MadedInClient from './pages/bingo/MadedInClient';

function App() {
  const [year, setYear] = useState(2024);
  const [semester, setSemester] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path="/madedinclient/:location" element={<MadedInClient/>}></Route>
      <Route path="/hueRU/:type" element={<ViewResult/>}></Route>
      <Route path="/" element={<Introduce/>}></Route>
      <Route path="/bingo" element={<Home/>}></Route>
      <Route path="/view" element={<Index/>}></Route>
      <Route path="/info" element={<BingoInfo/>}></Route>
      <Route path="/info/:id" element={<BingoInfo />} />
      <Route path="/made/:location" element={<MadeBingo/>}></Route>
      <Route path="/madedragbingo" element={<MadeDragBingo/>}></Route>
      <Route path="/madedragbingo/:id" element={<MadeDragBingo/>}></Route>
      <Route path="/madedragbingo/:id/:location" element={<MadeDragBingo/>}></Route>
      <Route path="/madedbingo/:location" element={<MadedBingo/>}></Route>
      <Route path="/madededit/:location" element={<MadedBingoEdit/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/cal" element={<Calendar />}/>
      <Route path="/review" element={<MadeReview />}/>
      <Route path="/dragreview/:location" element={<MadeDragReview />}/>
      <Route path="/viewreview/:id" element={<ViewReview />}/>
      <Route path="/viewnotice/:id" element={<ViewNotice />}/>
      <Route path="/notification" element={<Noti />}/>
      <Route path="/hueInfo" element={<HueInfo/>}></Route>
      <Route path="/hueInfo2" element={<HueInfo2/>}></Route>
      <Route path="/test/0" element={<Test year={year} setYear={setYear} semester={semester} setSemester={setSemester}/>}/>
      <Route path="/test/1" element={<Test1 selectedReason={selectedReason} setSelectedReason={setSelectedReason}/>} />
      <Route path="/test/2" element={<Test2 selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} />}/>
      <Route path="/test/3" element={<Test3 inputValue={inputValue} setInputValue={setInputValue}/>}></Route>
      <Route path="/result" element={<Result year={year} setYear={setYear} 
      semester={semester} setSemester={setSemester}
      selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers}
      selectedReason={selectedReason} setSelectedReason={setSelectedReason}
      inputValue={inputValue} setInputValue={setInputValue}
      />}></Route>
      <Route path="/readportfolio" element={<ReadPortfolio/>}></Route>
      <Route path="/changeportfolio" element={<ChangePortfolio />}></Route>
      <Route path="/mypage" element={<MyPage />}></Route>
      <Route path="/alarm" element={<Alarm />}></Route>
      <Route path="/alarmmanage" element={<AlarmManage />}></Route>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
