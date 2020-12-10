import React from 'react';

const TabPane = ({children, handleClick}) => {
    debugger;
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    );
};

export default TabPane;