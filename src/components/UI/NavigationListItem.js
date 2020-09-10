import React from 'react';
import styled from 'styled-components';
import {theme} from '../../localData/theme'

const StyledListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 37px;

  .navigationList-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  a {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-size: 12px;
  }

  img {
    color: red;
  }

  .navigationList-item-name {
    display: flex;
    width: 30%;
    align-items: center;
    color: ${({ theme, isActive, isHover }) => isActive || isHover ? theme.mint : theme.grayForDashboard};
    margin-left: 27px;
  }

  .active-item {
    width: 4px;
    height: 16px;
    background-color: ${({ theme }) => theme.mint};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const NavigationListItem = ({link, SvgSrc, name, id, isActive, onClick, onmouseEnterHandler, hoveredEl, onmouseLeaveHandler}) => {
    return (
      <StyledListItem isActive={isActive} isHover={hoveredEl}>
            <li
                className="navigationList-item"
                id={id}
                onClick={() => onClick(id)}
                onMouseEnter={()=> onmouseEnterHandler(id)}
                onMouseLeave={()=> onmouseLeaveHandler()}
            >
                {isActive && <div className="active-item"></div>}
                <a >
                    <SvgSrc style={isActive || hoveredEl ? {fill: theme.mint} : {fill: theme.grayForDashboard}}/>
                    <span className="navigationList-item-name">{name}</span>
                </a>
            </li>
      </StyledListItem>
    );
};

export {NavigationListItem};