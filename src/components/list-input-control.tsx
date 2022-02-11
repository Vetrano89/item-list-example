import { ReactElement, FC, useState, KeyboardEvent, useRef } from "react";
import styled from 'styled-components'
import Label from './label';
import Input from './input';
import { ListItem as IListItem } from '../types';
import List from "./list";

interface Props {
  disabled: boolean;
  label: string;
  maxItems: number;
  placeholder: string;
}

const ListInputControlContainer = styled.form`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const ListInputControl: FC<Props> = ({ disabled, label, maxItems, placeholder }): ReactElement => {
  const formRef = useRef<HTMLFormElement>(null);
  const [listItems, setListItems] = useState<IListItem[]>([]);

  const safeRemoveListItem = (listItemIndex: number) => {
    const newList = listItems.filter((listItem, currentListItemIndex) => (
      currentListItemIndex !== listItemIndex
    ));
    setListItems(newList);
  }

  const safeAddListItems = (newListItem: IListItem) => {
    console.log(newListItem);
    const newItemList = [...listItems];
    newItemList.unshift(newListItem);
    setListItems(newItemList);
  }

  const onSubmitListItem = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    safeAddListItems({ text: input.value });
    formRef?.current?.reset();
  }

  const itemLimitReached = listItems.length >= maxItems;

  return (
    <ListInputControlContainer ref={formRef}>
      <Label>
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        onEnter={onSubmitListItem}
        disabled={disabled || itemLimitReached} />
      <List listItems={listItems} handleRemoveListItem={safeRemoveListItem} disabled={disabled} />
    </ListInputControlContainer>
  );
};

export default ListInputControl;