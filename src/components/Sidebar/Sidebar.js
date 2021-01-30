import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ManageSidebar from 'components/ManageSidebar/ManageSidebar';
import {ReactComponent as CloseSign} from 'assets/icons/closeSign.svg';
import { ReactComponent as LogOutIcon } from 'assets/icons/logOutIcon.svg';
import {ReactComponent as PigLogo} from 'assets/icons/pigSidebarLogo.svg';
import { ReactComponent as OverviewIcon } from './../../assets/icons/overviewIcon.svg';
import { ReactComponent as ReportsIcon } from './../../assets/icons/reportsIcon.svg';
import { ReactComponent as SavingsIcon } from './../../assets/icons/savingsIcon.svg';
import { ReactComponent as SettingsIcon } from './../../assets/icons/settingsDashboard.svg';
import { ReactComponent as UsersIcon } from './../../assets/icons/usersDashboard.svg';
import { userActions } from 'redux/actions/userActions';
import TabPane from 'components/UI/TabPane';

const StyledHeader = styled.header`
  display: none;

  ${({ theme }) => theme.devices.mobile} {
    display: flex;
    justify-content: space-between;
    padding: 0.5em 0;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: flex-start;
  font-size: 1em;
  padding: 0.25em;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({theme}) => theme.mainBlue};
`;


const StyledSideBar = styled.nav`
  height: 100%;
  width: 180px;
  position: fixed;
  background-color: ${({ theme }) => theme.sidebarBlue};

  ${({ theme }) => theme.devices.tablet} {
    width: 100px;
  }

  ${({ theme }) => theme.devices.mobile} {
    position: absolute;
    left: 0;
    top: 0;
    display: ${({ visibility }) => (visibility ? 'block' : 'none')};
    width: 280px;
    z-index: 400;
  }
`;

const StyledCloseSign = styled(CloseSign)`
  display: none;
  position: absolute;
  right: 0;
  margin: 0.8em 0.8em 0 0;
  cursor: pointer;

  path{
    stroke: ${({theme}) => theme.lightMint };
  }

  ${({theme}) => theme.devices.mobile}{
    display: block;
  }

  &:hover{
    transform: scale(1.2);
  }
`

const LogoWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LogoNameWrapper = styled.span`
  margin-top: 12px;
  font-size: 12px;
  color: white;

  ${({ theme }) => theme.devices.tablet}{
    display: none;
  }

  ${({ theme }) => theme.devices.mobile}{
    display: block;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const detectClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      sidebarVisibility === true
    ) {
      setSidebarVisibility((prevState) => {
        setSidebarVisibility(!prevState);
      });
    }
  };
  useEffect(() => {
    document.addEventListener('click', detectClickOutside);

    return () => document.removeEventListener('click', detectClickOutside);
  });

  const setVisiblity = () => setSidebarVisibility((prevState) => !prevState);
  return (
    <>
      <StyledHeader visibility={!sidebarVisibility}>
        <StyledButton onClick={setVisiblity} ref={buttonRef}>
          MENU
        </StyledButton>
        <StyledButton onClick={() => dispatch(userActions.logout())}>
          <LogOutIcon />
          Log out
        </StyledButton>
      </StyledHeader>
      <StyledSideBar visibility={sidebarVisibility} ref={sidebarRef}>
        <StyledCloseSign onClick={setVisiblity} />
        <LogoWrapper>
          <PigLogo />
          <LogoNameWrapper>Budget Planner</LogoNameWrapper>
        </LogoWrapper>
        <ManageSidebar>
          <TabPane Icon={OverviewIcon} name="Overview" href="./" num="0" />
          <TabPane Icon={ReportsIcon} name="Reports" href="reports" num="1" />
          <TabPane Icon={SavingsIcon} name="Savings" href="#" num="2" />
          <TabPane Icon={SettingsIcon} name="Settings" href="#" num="3" />
          <TabPane Icon={UsersIcon} name="Users" href="#" num="4" />
        </ManageSidebar>
      </StyledSideBar>
    </>
  );
};

export default Sidebar;