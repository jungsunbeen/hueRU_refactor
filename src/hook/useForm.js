import { useState } from "react"

export const useForm = () => {
  const [value, setValue] = useState(initData());
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

function initData() {
  return '';
}