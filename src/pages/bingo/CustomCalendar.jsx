import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdOutlineEditCalendar } from 'react-icons/md';
//react-calendar 로 커스텀한 캘린더
const CustomCalendar = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
      <CalendarContainer>
        <MdOutlineEditCalendar onClick={handleToggleCalendar}></MdOutlineEditCalendar>
        <CalendarWrapper isOpen={isOpen}>
          <Calendar onChange={handleDateChange} value={value} selectRange={true} locale="en-US"
                    formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}></Calendar>
        </CalendarWrapper>
      </CalendarContainer>
  );
};

export default CustomCalendar;

const CalendarContainer = styled.div`
  position: relative;
  display: flex;
`;

const CalendarWrapper = styled.div`
  z-index: 11;
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};

  .react-calendar {
    width: 300px;
    max-width: 100%;
    background: white;
    border: 2px solid #a0a096;
    border-radius: 0px 20px 20px 20px;
    font-family: 'Pretendard-Regular';
    font-size: 18px;
    line-height: 1.125em;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 5px 20px 20px 20px;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 0.5em;
  }

  /* .react-calendar__navigation__label {
    white-space: nowrap;
  } */

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: 0.9em;
    color: #616161;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 500;
    color: #1E3A8A;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.2em;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
  }
  .react-calendar__month-view__days__day {
    color: #1E3A8A;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__decade-view__years__year--neighboringDecade,
  .react-calendar__century-view__decades__decade--neighboringCentury {
    color: #C4C4C4;
    height: 40px;
    width: 40px;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    height: 40px;
    width: 60px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 0.9em;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }

  .react-calendar__month-view__days__day--neighboringMonth:disabled,
  .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__tile--now {
    background: #ffff76;
    border-radius: 50%;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }

  .react-calendar__tile--hasActive {
    background: #1E3A8A;
    color: white;
    border-radius: 50%;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }

  .react-calendar__tile--active {
    background: #1E3A8A;
    color: white;
    border-radius: 50%;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1E3A8A;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #E4E7F1;
  }

  .react-calendar__tile--range {
    background: #E4E7F1;
    color: #1E3A8A;
    border-radius: 0;
}

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
      background: #1E3A8A;
      color: white;
      border-radius: 50%;
  }
`;

