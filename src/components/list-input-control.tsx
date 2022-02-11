import { ReactElement, FC, useState, KeyboardEvent, useRef, useEffect, MouseEvent } from "react";
import styled from 'styled-components'
import Label from './label';
import Input from './input';
import { ListItem as IListItem } from '../types';
import List from "./list";
import { getItems, addItem, deleteItem } from "../api/item-list";

const API_ERROR = 'Something went wrong, please try again!';
const WHITESPACE_ERROR = 'Whitespace only values are not valid.';
const EMPTY_ERROR = 'Please enter at least one character before submitting.';
const REQUIRED_ERROR = 'This list is required, please enter a value.';
const SERVER_ERROR = 'The server may not be running or communicating properly.'

interface Props {
  disabled: boolean;
  label: string;
  maxItems: number;
  placeholder: string;
  required: boolean;
}

const ListInputControlContainer = styled.form`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const ErrorText = styled.p`
  color: red;
`;

const ListInputControl: FC<Props> = ({ disabled, label, maxItems, placeholder, required }): ReactElement | null => {
  const formRef = useRef<HTMLFormElement>(null);
  const [listItems, setListItems] = useState<IListItem[] | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // https://github.com/facebook/react/issues/14326
    async function fetchItems() {
      const response = await getItems();
      console.log(response);
      if (response.status !== 200) {
        setError(SERVER_ERROR);
      }
      setListItems(response.data)
    }
    fetchItems();
  }, [])

  if (!listItems) {
    /** In the real world this would be a loading spinner, or some kind of skeleton component */
    return <div>Loading your list...</div>;
  }

  const removeListItem = async (e: MouseEvent<HTMLButtonElement>, listItemIndex: number) => {
    e.preventDefault();
    const response = await deleteItem(listItemIndex);
    if (response.status !== 200) {
      setError(API_ERROR);
    } else {
      setListItems(response.data);
    }
  }

  const addListItems = async (newListItem: IListItem) => {
    setSubmitting(true);
    const response = await addItem(newListItem);
    if (response.status === 200) {
      setListItems(response.data)
      formRef?.current?.reset();
    } else {
      setError(API_ERROR);
    }
    setSubmitting(false);
  }

  const onSubmitListItem = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;

    const cleanInput = input.value.trim();
    const isOnlyWhitespace = cleanInput.length === 0;

    if (isOnlyWhitespace) {
      setError(WHITESPACE_ERROR);
      return;
    }

    if (!input.value) {
      setError(EMPTY_ERROR);
      return;
    }

    setError('');

    if (!submitting) {
      addListItems({ text: cleanInput });
    }
  }

  const itemLimitReached = listItems.length >= maxItems;
  const displayEmptyListError = required && listItems.length === 0;

  return (
    <ListInputControlContainer ref={formRef}>
      <Label>
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        onEnter={onSubmitListItem}
        disabled={disabled || itemLimitReached || submitting} />
      <List listItems={listItems} handleRemoveListItem={removeListItem} disabled={disabled} />
      {error && (
        <ErrorText>{error}</ErrorText>
      )}
      {displayEmptyListError && (
        <ErrorText>{REQUIRED_ERROR}</ErrorText>
      )}
    </ListInputControlContainer>
  );
};

export default ListInputControl;