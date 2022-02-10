import React, { ReactElement, FC, ReactNode } from "react";
import styled from 'styled-components'

const StyledLabel = styled.label`
  color: blue;
  font-size: 10px;
`

interface Props {
  children: ReactNode
}

const Label: FC<Props> = ({ children }): ReactElement => {
  return (
    <StyledLabel>
      {children}
    </StyledLabel>
  );
};

export default Label;