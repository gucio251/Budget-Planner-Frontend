import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { SidebarItem } from 'components/UI/SidebarItem';
import { Icon } from '@material-ui/core';

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
    
};

export default ManageSidebar;