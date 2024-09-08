import React, { useState } from 'react';
import styled from 'styled-components';

const YearSemesterSelector = ({ onChange }) => {
  const [year, setYear] = useState(2024);
  const [semester, setSemester] = useState(1);

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setYear(newYear);
    onChange(newYear, semester);
  };

  const handleSemesterChange = (event) => {
    const newSemester = event.target.value;
    setSemester(newSemester);
    onChange(year, newSemester);
  };

  return (
    <SelectorContainer>
      <Selector value={year} onChange={handleYearChange}>
        {Array.from({ length: 10 }, (_, i) => 2024 + i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Selector>
      <Span>년</Span>
      <Selector value={semester} onChange={handleSemesterChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </Selector>
      <Span>학기</Span>
    </SelectorContainer>
  );
};

export default YearSemesterSelector;

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 10rem;
`;

const Selector = styled.select`
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Span = styled.span`
  margin: 0 5px;
`;
