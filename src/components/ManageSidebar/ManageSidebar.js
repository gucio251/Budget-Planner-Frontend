import React, {useState} from 'react';
<<<<<<< HEAD
import {Sidebar} from './../Sidebar/Sidebar'

const ManageSidebar = () => {
    const [hoveredEl, sethoveredEl] = useState();
    const [activeElement, setActiveEl] = useState(0);

    const onClick = (id) => {
        setActiveEl(id);
    };

    const onmouseEnterHandler = id => {
        sethoveredEl(id);
    }

    const onmouseLeaveHandler = () => {
        sethoveredEl(null);
    }

    return (
      <Sidebar
        onClick={onClick}
        onmouseEnterHandler={onmouseEnterHandler}
        onmouseLeaveHandler={onmouseLeaveHandler}
        hoveredEl={hoveredEl}
        activeElement={activeElement}
      />
    );
};

export {ManageSidebar};
=======
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { SidebarItem } from 'components/UI/SidebarItem';

const NavigationList = styled.ul`
  margin-top: 47px;
  display: flex;
  align-items: center;
  flex-flow: column;
  list-style-type: none;
  box-sizing: border-box;
`;

const ManageSidebar = ({children}) => {
    const [activeSidebarEl, setActiveSidebarEl] = useState(0);
    const [hoveredSidebarEl, setHoveredSidebarEl] = useState();

    return (
      <NavigationList>
        {children.map((el, i) => {
        const {props} = el;
        const {Icon, name, href, num} = props;

        return (
          <SidebarItem
            key={i}
            href={href}
            Icon={Icon}
            name={name}
            isActive={activeSidebarEl === parseInt(num)}
            isHover = {hoveredSidebarEl === parseInt(num)}
            onMouseEnter={()=> setHoveredSidebarEl(parseInt(num))}
            onMouseLeave={()=> setHoveredSidebarEl(null)}
            onClick={() => setActiveSidebarEl(parseInt(num))}
          />
        );
        })}
      </NavigationList>
    );
};

ManageSidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ManageSidebar;
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
