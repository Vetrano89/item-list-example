import { ReactElement, FC, KeyboardEvent } from "react";
import styled from 'styled-components'

const StyledInput = styled.input`
  outline: 0;
  border-width: 0 0 2px;
  border-color: blue;
  width: 100%;
`

interface Props {
  placeholder: string;
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({ placeholder, onEnter }): ReactElement => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e);
    }
  }

  return (
    <StyledInput placeholder={placeholder} onKeyDown={handleKeyDown} />
  );
};

export default Input;