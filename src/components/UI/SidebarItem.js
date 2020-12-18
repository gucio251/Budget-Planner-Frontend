import React from 'react';
import styled from 'styled-components';
import { theme } from '../../localData/theme';

const ListItem = styled.li`
  display: flex;
  gap: 25px;
  align-items: center;
  width: 100%;
  color: ${({ theme, isActive, isHover }) => isActive || isHover ? theme.mint : theme.grayForDashboard};
  font-size: 16px;
  padding: 18px 30px 18px 0;
  cursor: pointer;
`;

const Active = styled.div`
    width: 4px;
    height: 16px;
    background-color: ${({ theme }) => theme.mint};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    opacity: ${({isActive}) => isActive ? 1: 0};
`

const SidebarItem = ({Icon, name, isActive, isHover, onClick, onMouseEnter, onMouseLeave}) => {
    return (
      <ListItem
        onClick={onClick}
        isActive={isActive}
        isHover={isHover}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {<Active isActive={isActive} />}
        <Icon
          style={
            isActive || isHover ? { fill: theme.mint } : { fill: theme.grayForDashboard }
          }
        />
        {name}
      </ListItem>
    );
};

export {SidebarItem};