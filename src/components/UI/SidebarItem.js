import React from 'react';
import styled from 'styled-components';
import { theme } from '../../localData/theme';
import { Link } from '@reach/router'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const ListItem = styled.li`
  display: flex;
  position: relative;
  gap: 25px;
  align-items: center;
  width: 100%;
  color: ${({ theme, isActive, isHover }) =>
    isActive || isHover ? theme.lightMint : theme.grayForDashboard};
  font-size: 16px;
  padding: 18px 30px 18px 18px;
  cursor: pointer;

  ${({ theme }) => theme.devices.tablet} {
    padding-right: 0;
    padding-left: 0;
    justify-content: center;
  }
`;

const Active = styled.div`
    position: absolute;
    left: 0px;
    width: 4px;
    height: 16px;
    background-color: ${({ theme }) => theme.lightMint};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    opacity: ${({isActive}) => isActive ? 1: 0};
`

const Text = styled.span`
  ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

const SidebarItem = ({Icon, name, isActive, isHover, onClick, onMouseEnter, onMouseLeave, href}) => {
    return (
      <StyledLink to={href}>
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
              isActive || isHover
                ? { fill: theme.lightMint }
                : { fill: theme.grayForDashboard }
            }
          />
          <Text>{name}</Text>
        </ListItem>
      </StyledLink>
    );
};

export {SidebarItem};