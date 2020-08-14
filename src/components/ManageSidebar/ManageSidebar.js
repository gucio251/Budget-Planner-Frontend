import React, {useState} from 'react';
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