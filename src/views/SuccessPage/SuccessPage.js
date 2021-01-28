import React from 'react';
import styled from 'styled-components'
import SuccessWindow from 'components/SuccessWindow/SuccessWindow';
import AppInfoSide from 'components/AppInfoSide/AppInfoSide';
import { routes } from 'routes/index';

const linkData = { text: "Don't have an account?", linkText: "Sign up", href: '/' };
const buttonName = "Sign in";

const StyledPage = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;

    ${({ theme }) => theme.devices.tablet} {
        display: block;
        flex-direction: column;
    }

  ${({ theme }) => theme.devices.mobile} {
        height: 100vh;
        display: flex;
        flex-direction: row;
        overflow-y: hidden;
  }
`

const SuccessPage = () => {
    return (
        <StyledPage>
            <AppInfoSide
                linkData={linkData}
                buttonName={buttonName}
                href={linkData.href}
            />
            <SuccessWindow
                successMessage={"Account successfully created!"}
                href={routes.loginPage}
            />
        </StyledPage>
    );
};

export default SuccessPage;