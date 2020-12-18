import React, {useState} from 'react';

const withMobileHandling = (Component) => props => {
    const [displayInfoSide, setDisplayInfoSide] = useState(true);

    const handleMovingToInputSide = (e) => {
        e.preventDefault();
        setDisplayInfoSide(false);
    };

    const handleMobileDisplay = () => {
        setDisplayInfoSide(false);
    }
    return (
        <Component {...props} handleMovingToInputSide={handleMovingToInputSide} handleMobileDisplay={handleMobileDisplay} displayInfoSide={displayInfoSide}/>
    );
};

export default withMobileHandling;