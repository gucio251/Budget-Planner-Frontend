import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button'
import {ReactComponent as AddSign} from 'assets/icons/addSignButton.svg';
import { ReactComponent as Avatar } from 'assets/icons/userAvatar.svg';
import { ReactComponent as ExpandArrow } from 'assets/icons/expandArrow.svg';

const StyledDashboardMenu = styled.nav`
    width: 100%;
    height: 70px;
    background: white;
    display: flex;
    justify-content:flex-end;
    padding-right: 140px;
`

const MenuItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonWrapper = styled.div`
    width: 20%;
`

const ButtonItemsWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const UserSectionWrapper = styled.div`
  padding-left: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #1c245d;
`;

const DashboardMenu = ({onClickButton}) => {
    return (
      <StyledDashboardMenu>
        <MenuItemsWrapper>
          <ButtonWrapper>
            <Button onClick={() => onClickButton(true)} color="#2F54F3">
              <ButtonItemsWrapper>
                <AddSign />
                Add new transaction
              </ButtonItemsWrapper>
            </Button>
          </ButtonWrapper>
          <UserSectionWrapper>
            <Avatar />
            {'Caroline'}
            <ExpandArrow />
          </UserSectionWrapper>
        </MenuItemsWrapper>
      </StyledDashboardMenu>
    );
};

DashboardMenu.propTypes = {
    
};

export default DashboardMenu;