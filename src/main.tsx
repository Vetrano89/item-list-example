import { ReactElement, FC, ReactNode, useState, SetStateAction, Dispatch, ChangeEvent } from "react";
import styled from 'styled-components'
import ListInputControl from "./components/list-input-control";

const InputsFlexContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

const LabelInputFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const StyledPropInput = styled.input`
  flex-grow: 1;
  margin-left: 10px;
  max-width: 195px;
`;

const Label: FC = (): ReactElement => {
  const [label, setLabel] = useState('Top 3 priorities');
  const [placeholder, setPlaceholder] = useState('Enter your priorities here');
  const [maxItems, setMaxItems] = useState(3);
  const [disabled, setDisabled] = useState(false);

  const onChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  }

  const onChangePlaceholder = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaceholder(e.target.value);
  }

  const onChangeMaxItems = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxItems(parseInt(e.target.value));
  }

  const onChangeDisabled = () => {
    setDisabled(!disabled);
  }

  return (
    <div>
      <InputsFlexContainer>
        <LabelInputFlexContainer>
          Label
          <StyledPropInput value={label} onChange={(e) => onChangeLabel(e)} />
        </LabelInputFlexContainer>
        <LabelInputFlexContainer>
          Placeholder
          <StyledPropInput value={placeholder} onChange={(e) => onChangePlaceholder(e)} />
        </LabelInputFlexContainer>
        <LabelInputFlexContainer>
          Max Items
          <StyledPropInput value={maxItems} onChange={(e) => onChangeMaxItems(e)} />
        </LabelInputFlexContainer>
        <LabelInputFlexContainer>
          Disabled
          <StyledPropInput type="checkbox" checked={disabled} onChange={onChangeDisabled} />
        </LabelInputFlexContainer>
      </InputsFlexContainer>
      <div>
        <ListInputControl
          label={label}
          placeholder={placeholder || 'This is the default placeholder'}
          disabled={disabled}
          maxItems={maxItems}
        />
      </div>
    </div >
  );
};

export default Label;