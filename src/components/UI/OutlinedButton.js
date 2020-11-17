import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#1665D8',
    borderColor: '#1665D8',
    width: '85%',
    '&:hover': {
      transform: 'translateY(-5px)',
      cursor: 'pointer'
    },
  },
}))(Button);


const OutlinedButton = ({children, size="small", onClick}) => {
    return (
      <ColorButton
        variant="outlined"
        color="primary"
        size={size}
        onClick={onClick}
      >
        {children}
      </ColorButton>
    );
};

OutlinedButton.propTypes = {
    
};

export default OutlinedButton;