import { ReactElement, FC, MouseEvent } from "react";
import styled from 'styled-components'
import { ListItem as IListItem } from '../types';
import ListItem from './list-item';

interface Props {
  disabled: boolean;
  handleRemoveListItem: (e: MouseEvent<HTMLButtonElement>, i: number) => void;
  listItems: IListItem[];
}

const StyledList = styled.ul`
  box-sizing: border-box;
  padding-left: 20px;
  text-align: left;
  width: 100%;
`;

const List: FC<Props> = ({ listItems, handleRemoveListItem, disabled }): ReactElement | null => {
  if (!listItems.length) {
    return null;
  }

  return (
    <StyledList>
      {listItems.map((listItem, i) => (
        <ListItem key={listItem.text + i} disabled={disabled} handleRemoveListItem={(e) => handleRemoveListItem(e, i)}>
          {listItem.text}
        </ListItem>
      ))}
    </StyledList>
  );
};

export default List;