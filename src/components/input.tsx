import { ReactElement, FC, KeyboardEvent } from "react";
import styled from 'styled-components'

const StyledInput = styled.input`
  border-width: 0 0 2px;
  border-color: blue;  
  outline: 0;
  width: 100%;
`

interface Props {
  disabled: boolean;
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: FC<Props> = ({ placeholder, onEnter, disabled }): ReactElement => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    if (e.key === 'Enter') {
      onEnter(e);
    }
  }

  return (
    <StyledInput disabled={disabled} placeholder={placeholder} onKeyDown={handleKeyDown} />
  );
};

export default Input;