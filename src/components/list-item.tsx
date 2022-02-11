import { ReactElement, FC, ReactNode, MouseEventHandler } from "react";
import styled from 'styled-components'

const StyledListItem = styled.li`
  font-size: 14px;

  /* https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator */
  & + li {
    margin-top: 10px;
  }
`

const ListItemFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  border: none;
`;

interface Props {
  children: ReactNode;
  disabled: boolean;
  handleRemoveListItem: MouseEventHandler<HTMLButtonElement>;
}

const ListItem: FC<Props> = ({ children, disabled, handleRemoveListItem }): ReactElement => {
  return (
    <StyledListItem>
      <ListItemFlexContainer>
        {children}
        {!disabled && (
          <StyledButton onClick={(e) => handleRemoveListItem(e)} disabled={disabled}>
            x
          </StyledButton>
        )}
      </ListItemFlexContainer>
    </StyledListItem>
  );
};

export default ListItem;