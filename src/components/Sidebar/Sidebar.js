import React from 'react';
import styled from 'styled-components';
import ManageSidebar from 'components/ManageSidebar/ManageSidebar';
import {ReactComponent as PigLogo} from 'assets/icons/pigSidebarLogo.svg'
import { ReactComponent as OverviewIcon } from './../../assets/icons/overviewIcon.svg';
import { ReactComponent as ReportsIcon } from './../../assets/icons/reportsIcon.svg';
import { ReactComponent as SavingsIcon } from './../../assets/icons/savingsIcon.svg';
import { ReactComponent as SettingsIcon } from './../../assets/icons/settingsDashboard.svg';
import { ReactComponent as UsersIcon } from './../../assets/icons/usersDashboard.svg';
import TabPane from 'components/UI/TabPane'

const StyledSideBar = styled.nav`
  height: 100vh;
  width: 100%;
  background-color: #2548e6;
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

  ${({theme}) => theme.devices.tablet}{
    display: none;
  }
`;

const Sidebar = () => {
    return (
      <StyledSideBar>
        <LogoWrapper>
          <PigLogo />
          <LogoNameWrapper>
            Budget Planner
          </LogoNameWrapper>
        </LogoWrapper>
        <ManageSidebar>
          <TabPane Icon={OverviewIcon} name="Overview" href="#" num="0" />
          <TabPane Icon={ReportsIcon} name="Reports" href="#" num="1" />
          <TabPane Icon={SavingsIcon} name="Savings" href="#" num="2" />
          <TabPane Icon={SettingsIcon} name="Settings" href="#" num="3" />
          <TabPane Icon={UsersIcon} name="Users" href="#" num="4" />
        </ManageSidebar>
      </StyledSideBar>
    );
};

export {Sidebar};