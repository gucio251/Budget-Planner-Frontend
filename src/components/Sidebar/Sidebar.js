import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import ManageSidebar from 'components/ManageSidebar/ManageSidebar';
import {ReactComponent as CloseSign} from 'assets/icons/closeSign.svg';
import {ReactComponent as PigLogo} from 'assets/icons/pigSidebarLogo.svg';
import { ReactComponent as OverviewIcon } from './../../assets/icons/overviewIcon.svg';
import { ReactComponent as ReportsIcon } from './../../assets/icons/reportsIcon.svg';
import { ReactComponent as SavingsIcon } from './../../assets/icons/savingsIcon.svg';
import { ReactComponent as SettingsIcon } from './../../assets/icons/settingsDashboard.svg';
import { ReactComponent as UsersIcon } from './../../assets/icons/usersDashboard.svg';
import TabPane from 'components/UI/TabPane';

const StyledButton = styled.button`
  display: none;
  font-size: 1em;
  padding: 0.25em;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({theme}) => theme.mainBlue};
  ${({ theme }) => theme.devices.mobile} {
    display: ${({ visibility }) => (visibility ? 'block' : 'none')};
  }
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
    const [sidebarVisibility, setSidebarVisibility]=useState(false);
    const sidebarRef=useRef(null);
    const buttonRef=useRef(null);

    const detectClickOutside = (e) => {
      if(!buttonRef.current.contains(e.target) && sidebarRef.current && !sidebarRef.current.contains(e.target)){
        setSidebarVisibility((prevState) => {
          setSidebarVisibility(!prevState);
        })
      }
    }
    useEffect(() => {
      document.addEventListener('click', detectClickOutside);

      return () => document.removeEventListener('click', detectClickOutside);
    })

    const setVisiblity = () => setSidebarVisibility((prevState) => !prevState);
    return (
      <>
        <StyledButton visibility={!sidebarVisibility} onClick={setVisiblity} ref={buttonRef}>
          MENU
        </StyledButton>
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