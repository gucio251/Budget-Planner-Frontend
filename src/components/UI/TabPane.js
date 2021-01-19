import React from 'react';

const TabPane = ({children, handleClick}) => {
    return (
        <div onClick={handleClick}>
            {children}
        </div>
    );
};

export default TabPane;