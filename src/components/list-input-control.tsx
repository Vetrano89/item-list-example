import { ReactElement, FC, useState, KeyboardEvent } from "react";
import styled from 'styled-components'
import Label from './label';
import Input from './input';
import ListItem from './list-item';
import { ListItem as IListItem } from '../types';

interface Props {
  label: string;
  placeholder: string;
  disabled: boolean;
}

const ListInputControlContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`;

const ListInputControl: FC<Props> = ({ label, placeholder, disabled }): ReactElement => {
  const [listItems, setListItems] = useState<IListItem[]>([]);

  const safeSetListItems = (newItemList: IListItem) => {
    setListItems([...listItems, newItemList])
  }

  const onSubmitListItem = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    safeSetListItems({ text: input.value });
  }

  console.log(listItems);

  return (
    <ListInputControlContainer>
      <Label>
        {label}
      </Label>
      <Input placeholder={placeholder} onEnter={onSubmitListItem} />
      {!!listItems.length && listItems.map((listItem) => {
        <ListItem>
          {listItem.text}
        </ListItem>
      })}
    </ListInputControlContainer>
  );
};

export default ListInputControl;