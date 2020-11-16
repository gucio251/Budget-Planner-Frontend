import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';

const StyledNavigation = styled.nav`
  width: 60%;
  display: flex;
  justify-content: flex-start;
  margin: 24px 0 19px 0;
`;

const LinkElement = styled.li`
    color: ${({ theme, active }) => active ? theme.mainBlue : theme.darkGray};
    position: relative;
    cursor: pointer;

    &::after{
        display: ${({active}) => active ? "block" : "none"};
        position: absolute;
        left: 0;
        top: calc(100% + 10px);
        content: ' ';
        width: 100%;
        height: 5px;
        background-color: ${({theme}) => theme.darkMint};
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
`

const StyledList = styled.ul`
  display: flex;
  list-style-type: none;

  & > ${LinkElement}:not(:last-child) {
    margin-right: 30px;
  }
`;

const NavWrapper = styled.div`
  width: 60%;
`;

const Tabs = ({children}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(1);
    return (
      <>
        <StyledNavigation>
          <StyledList>
            {children.map((el, i) => (
              <LinkElement
                key={i}
                active={parseInt(el.props.tab) === activeTabIndex}
                onClick={() => setActiveTabIndex(parseInt(el.props.tab))}
              >
                {el.props.title}
              </LinkElement>
            ))}
          </StyledList>
        </StyledNavigation>
        <NavWrapper>{children[activeTabIndex-1]}</NavWrapper>
      </>
    );
};

Tabs.propTypes = {
  children: PropTypes.element.isRequired
};

export default Tabs;