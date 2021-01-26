import React from 'react';
import styled from 'styled-components';
import { theme } from '../../localData/theme';
import { Link } from '@reach/router'

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`

const ListItem = styled.li`
  display: flex;
  position: relative;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  width: 100%;
  color: ${({ theme, isActive, isHover }) =>
    isActive || isHover ? theme.lightMint : theme.grayForDashboard};
  font-size: 16px;
  padding: 18px 30px 18px 30px;
  cursor: pointer;

  ${({ theme }) => theme.devices.tablet} {
    padding-right: 0;
    padding-left: 0;
    justify-content: center;
  }

  ${({ theme }) => theme.devices.mobile} {
    padding: 18px 30px 18px 30px;
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
  width: 100%;
  padding-left: 1em;
  ${({ theme }) => theme.devices.tablet} {
    display: none;
  }

  ${({ theme }) => theme.devices.mobile}{
    display: block;
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