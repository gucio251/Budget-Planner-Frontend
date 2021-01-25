import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';

const StyledNavigation = styled.nav`
  width: min(12em, 100%);
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 4px;
  padding: 0.8em 0;
`;

const LinkElement = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${({ theme, active }) =>
    active ? theme.dashboardBlack : theme.darkGray};
  font-size: 1em;
  position: relative;
  cursor: pointer;

  &::after {
    display: ${({ active }) => (active ? 'block' : 'none')};
    position: absolute;
    left: 0;
    top: calc(100% + 10px);
    content: ' ';
    width: 100%;
    height: 5px;
    background-color: ${({ theme }) => theme.mainBlue};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const StyledList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  list-style-type: none;
`;

const Tabs = ({children, handleSourceChange}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(1);
    return (
      <>
        <StyledNavigation>
          <StyledList>
            {children.map((el, i) => (
              <LinkElement
                key={i}
                active={parseInt(el.props.tab) === activeTabIndex}
                onClick={({target}) => {
                  handleSourceChange(target.textContent);
                  setActiveTabIndex(parseInt(el.props.tab))
                }}
              >
                {el.props.title}
              </LinkElement>
            ))}
          </StyledList>
        </StyledNavigation>
      </>
    );
};

Tabs.propTypes = {
  children: PropTypes.element.isRequired
};

export default Tabs;