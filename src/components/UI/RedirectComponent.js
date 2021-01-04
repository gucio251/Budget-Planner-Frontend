import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledRedirectComponent = styled.p`
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  position: relative;
  display: inline-block;
`

const StyledLink = styled.a`
    color: ${({ theme, linkColor }) => theme[linkColor]};
    font-weight: 510;
    text-decoration: none;
`

const RedirectComponent = ({spanText, linkText, href, linkColor}) => {
    return (
        <StyledRedirectComponent>
          {spanText}{" "}
        <StyledLink href={href} linkColor={linkColor}>
            {linkText}
          </StyledLink>
        </StyledRedirectComponent>
    );
};

RedirectComponent.propTypes = {
  spanText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  linkColor: PropTypes.string.isRequired
};

export default RedirectComponent;