import React, { ReactElement, FC, ReactNode } from "react";
import styled from 'styled-components'
import { ListItem as IListItem } from '../types';

const StyledLabel = styled.div`
  color: blue;
  font-size: 10px;
`

interface Props {
    children: ReactNode
}

const List: FC<Props> = ({ listItems: IListemItems[] }): ReactElement => {
    if (!listItems.length) {
        return null;
    }
    return (
        {!!listItems.length && listItems.map((listItem) => {
            <ListItem>
                {listItem.text}
            </ListItem>
        })
}
    );
};

export default List;