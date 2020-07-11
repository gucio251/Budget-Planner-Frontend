import React from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import PropTypes from 'prop-types';

const StyledRedirectComponent = styled(motion.span).attrs(({ className, linkColor }) => ({ className, linkColor }))`
display: flex;
justify-content: flex-start;
  .form-link {
    color: ${({ theme, linkColor }) => theme[linkColor]};
    text-decoration: none;
  }
`

const RedirectComponent = ({className, spanText, linkText, href, linkColor, variants}) => {
    return (
        <StyledRedirectComponent className={className} linkColor={linkColor} initial="initial" animate="final" variants={variants}>
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
  linkColor: PropTypes.string.isRequired,
  variants: PropTypes.object
};

export default RedirectComponent;