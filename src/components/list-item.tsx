import React, { ReactElement, FC, ReactNode } from "react";
import styled from 'styled-components'

const StyledLabel = styled.div`
  color: blue;
  font-size: 10px;
`

interface Props {
    children: ReactNode
}

const Label: FC<Props> = ({ children }): ReactElement => {
    return (
        <>
        </>
    );
};

export default Label;