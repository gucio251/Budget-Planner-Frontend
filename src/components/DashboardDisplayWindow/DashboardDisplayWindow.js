import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ReactComponent as Arrow} from 'assets/icons/arrowDashboardRight.svg';


const StyledDashboardDisplayWindow = styled.section`
    width: 96%;
    background-color: white;
    margin: 0 24px 0 0px;
    padding: 22px 0 0 22px;
    font-size: 18px;
    font-weight: 600;
`

const TitleInfo = styled.div`
    display: flex;
    color: ${({theme}) => theme.dashboardBlack};
`
const StyledRedirectElement = styled.div`
  color: #2F54F3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  padding: 0 30px 20px 0;
`;




const DashboardDisplayWindow = ({children, title}) => {
    return (
      <StyledDashboardDisplayWindow>
        <TitleInfo>
          {title}
        </TitleInfo>
        {children}
        <StyledRedirectElement>
          {"See more"}
          <Arrow />
        </StyledRedirectElement>
      </StyledDashboardDisplayWindow>
    );
};

DashboardDisplayWindow.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
};

export default DashboardDisplayWindow;