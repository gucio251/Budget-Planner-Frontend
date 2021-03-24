import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    const [activeSidebarEl, setActiveSidebarEl] = useState('overview');
    const [hoveredSidebarEl, setHoveredSidebarEl] = useState();

    useEffect(() => {
      const arr = window.location.href.split('/');
      const indexOfLastElement = arr.length -1;
      const activeElement = arr[indexOfLastElement] === 'dashboard' ? 'overview' : arr[indexOfLastElement];
      setActiveSidebarEl(activeElement);
    }, [window.location.href])
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
            isActive={activeSidebarEl === name.toLowerCase()}
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
