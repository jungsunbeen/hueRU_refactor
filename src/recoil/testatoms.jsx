import { atom } from 'recoil';

export const yearState = atom({
  key: 'yearState',
  default: 2024,
});

export const semesterState = atom({
  key: 'semesterState',
  default: 2,
});

export const answer2State= atom({
  key: 'answer2State',
  default: "",
});

export const answer3State= atom({
  key: 'answer3State',
  default: [],
});

export const answer4State= atom({
  key: 'answer4State',
  default: "",
});