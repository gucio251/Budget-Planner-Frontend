import React, {useRef, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {ReactComponent as LogOutIcon} from 'assets/icons/logOutIcon.svg'
import {userActions} from 'redux/actions/userActions'

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 100%;
  height: 50px;
  width: 130px;
  border-radius: 5px;
  background-color: white;
`;
const List = styled.ul`
  width: 90%;
  height: 90%;
  margin-top: 20px;
`;

const ListItem = styled.li`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ListItemText = styled.span`
  font-size: 13px;
  color: #264ae7;
  font-weight: 450;
`;

const useOutsideClickDetector = (ref, toggleFunc) => {
  useEffect(()=> {
    const handleClickOutside = (e) => {
      if(ref.current && !ref.current.contains(e.target)){
        toggleFunc(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref, toggleFunc])
}

const UserFeaturesList = ({setToggle}) => {
    const wrapperRef = useRef(null);
    const dispatch=useDispatch();
    useOutsideClickDetector(wrapperRef, setToggle);

    return (
      <Wrapper ref={wrapperRef}>
          <List>
            <ListItem onClick={() => dispatch(userActions.logout())}>
                <LogOutIcon/>
                <ListItemText>
                    Log Out
                </ListItemText>
            </ListItem>
          </List>
      </Wrapper>
    );
};

UserFeaturesList.propTypes = {
  setToggle: PropTypes.func.isRequired
}
export default UserFeaturesList;