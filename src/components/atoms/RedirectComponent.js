import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledRedirectComponent = styled.span.attrs(({ className, linkColor }) => ({ className, linkColor }))`
display: flex;
justify-content: flex-start;
  .form-link {
    color: ${({ theme, linkColor }) => theme[linkColor]};
    text-decoration: none;
  }
`

const RedirectComponent = ({className, spanText, linkText, href, linkColor}) => {
    return (
        <StyledRedirectComponent className={className} linkColor={linkColor}>
            <div>
                {spanText}{" "}
                <a href={href} className="form-link">{linkText}</a>
            </div>
        </StyledRedirectComponent>
    );
};

StyledRedirectComponent.propTypes = {
  className: PropTypes.string.isRequired,
  spanText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  linkColor: PropTypes.string.isRequired
};

export default RedirectComponent;