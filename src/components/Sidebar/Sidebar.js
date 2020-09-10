import React from 'react';
import styled from 'styled-components';
import {NavigationListItem} from 'components/UI/NavigationListItem'
import {navigationList} from './sidebarData';

const StyledNavbar = styled.nav`
  height: 100vh;
  width: 180px;
  background-color: ${({ theme }) => theme.mainBlue};

  .navigation-logo {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo-name {
    margin-top: 12px;
    font-size: 12px;
    color: white;
  }

  .navigation-list {
    margin-top: 47px;
    display: flex;
    align-items: center;
    flex-flow: column;
    list-style-type: none;
    box-sizing: border-box;
  }
`;

const Sidebar = ({onClick, activeElement, hoveredEl, onmouseEnterHandler, onmouseLeaveHandler}) => {
    return (
        <StyledNavbar>
            <div className="navigation-logo">
                <svg id="pig_3_" data-name="pig (3)" xmlns="http://www.w3.org/2000/svg" width="44" height="38" viewBox="0 0 44 38">
                <rect id="Rectangle" width="8" height="3" transform="translate(19 10)" fill="#03dac5"/>
                <path id="Shape" d="M27.654,37.148l-1.561-3.919h-5.61l-1.56,3.919A11.911,11.911,0,0,1,15.583,38a21.242,21.242,0,0,1-4.067-.851V30.9a14.214,14.214,0,0,1-4.431-4.646,14,14,0,0,1-.958-1.969h-.97a5.113,5.113,0,1,1,0-10.225h.971A14.2,14.2,0,0,1,19.336,5.112h4.909A9.048,9.048,0,0,1,32.4,0h1.29V2.142a9.08,9.08,0,0,1,3.866-.864h1.29v9.808a14.12,14.12,0,0,1,1.031,1.694H44v9.465l-6.581,6.713a14.2,14.2,0,0,1-2.357,1.94v6.25A19.326,19.326,0,0,1,31.109,38,13,13,0,0,1,27.654,37.148Z" fill="#03dac5"/>
                <rect id="Rectangle-2" data-name="Rectangle" width="3" height="3" transform="translate(31 13)" fill="#03dac5"/>
                </svg>
                <h1 className="logo-name">Budget Planner</h1>
            </div>
            <ul className="navigation-list">
                {navigationList.map(({Icon, name, link}, index) => {
                    return (
                      <NavigationListItem
                        id={index}
                        link={link}
                        SvgSrc={Icon}
                        name={name}
                        isActive={activeElement === index ? true : false}
                        onClick={onClick}
                        onmouseEnterHandler={onmouseEnterHandler}
                        onmouseLeaveHandler={onmouseLeaveHandler}
                        hoveredEl={hoveredEl === index ? true : false}
                      />
                    );
                })}
            </ul>
        </StyledNavbar>
    );
};

export {Sidebar};