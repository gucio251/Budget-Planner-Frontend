import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ReactComponent as DropdownArrow } from 'assets/icons/expandIconDropdown.svg';

const BootstrapInput = withStyles((theme) => ({
  input: {
    position: 'relative',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}))(InputBase);

const CustomDropdownDashboard = props => {
    const {name, value, handleChange, list} = props;
    return (
      <FormControl>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={value}
          name={name}
          onChange={handleChange}
          input={<BootstrapInput />}
          IconComponent={DropdownArrow}
        >
          {list.map((listItem, i) => (
            <MenuItem
              value={listItem}
              key={i}
            >
                {listItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
};

CustomDropdownDashboard.propTypes = {
    
};

export default CustomDropdownDashboard;