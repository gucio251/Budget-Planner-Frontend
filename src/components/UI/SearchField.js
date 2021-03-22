import React from 'react';
import { filtrationActions } from 'redux/actions/filtrationActions';
import { useSelector,  useDispatch} from 'react-redux';
import styled from 'styled-components';
import {ReactComponent as SearchIcon} from 'assets/icons/searchIcon.svg';

const StyledSearchField = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    min-width: 300px;
    height: 40px;
    padding: 0 0.5em;
    border-radius: 4px;
    background-color: white;

    ${({theme}) => theme.devices.mobile}{
        width: 100%;
    }
`;

const StyledSearchIcon = styled(SearchIcon)`
    position: absolute;
`

const Input = styled.input`
  border-radius: 4px;
  margin-left: 25px;
  width: 85%;
  height: 100%;
  outline: none;
  border: none;
`;

const SearchField = () => {
    const dispatch = useDispatch();
    const commentValue = useSelector(state => state.filtration.filtersToBeConfirmed.comment);

    const handleChange = e => {
        const comment = e.target.value;
        dispatch(filtrationActions.setCommentFilter(comment));
    }

    return (
        <StyledSearchField>
            <StyledSearchIcon />
            <Input
                placeholder={'Enter a key word...'}
                value={commentValue}
                onChange={handleChange}
            />
        </StyledSearchField>
    );
};

export default SearchField;