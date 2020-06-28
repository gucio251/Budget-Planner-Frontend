import React from "react";
import Button from "./../atoms/Button";
import styled from "styled-components";
import {motion} from "framer-motion";

const StyledSuccessWindow = styled.div.attrs(({ className }) => ({
  className,
}))`
  .message {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 76px;
    color: ${({ theme }) => theme.mainBlue};
    width: 400px;
  }

  .btn-success {
    width: 300px;
    margin-top: 93px;
  }
`;

const circleVariants = {
    hidden: {
        pathLength:0,
        strokeWidth: 3.35
    },
    visible: {
        pathLength: 1,
        strokeWidth: 3.35,
        transition: {
            duration: 2,
            ease: "easeInOut"
        }
    }
}

const onClick = () => {
  alert("sd");
};

const SuccessWindow = ({ className, successMessage }) => {
  return (
    <StyledSuccessWindow className={className}>
      <span className="message">{successMessage}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="188.465"
        height="188.481"
        viewBox="0 0 188.465 188.481"
      >
        <g id="Group_3" data-name="Group 3" transform="translate(1.635 1.879)">
          <g id="Done" transform="translate(0.45 0.45)">
            <motion.path
              id="Shape"
              d="M63.446,130.232h0a52.462,52.462,0,0,1-10.021-.964l13.247.85C65.652,130.194,64.567,130.232,63.446,130.232ZM72.5,129.6,48,127.847A64.509,64.509,0,0,1,24.432,115.9,65.292,65.292,0,0,1,2.217,48.1a64.793,64.793,0,0,1,125.509,1.332,65.863,65.863,0,0,1,.994,26.339A64.722,64.722,0,0,1,72.5,129.6Z"
              transform="matrix(0.719, -0.695, 0.695, 0.719, 0.301, 90.085)"
              fill="#fff"
              stroke="#02ae9d"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="3.375"
              initial="hidden"
              animate="visible"
              variants={circleVariants}
            />
            <g id="bling" transform="translate(155.7 25.65)">
              <path
                id="Line"
                d="M.675,0V8.1"
                transform="translate(13.5)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
              <path
                id="Line-2"
                data-name="Line"
                d="M.675,0V8.1"
                transform="translate(13.5 18.9)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
              <path
                id="Line-3"
                data-name="Line"
                d="M.675,0V8.1"
                transform="translate(0.675 14.175) rotate(-90)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
              <path
                id="Line-4"
                data-name="Line"
                d="M.675,0V8.1"
                transform="translate(19.575 14.175) rotate(-90)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
            </g>
            <g
              id="bling-2"
              data-name="bling"
              transform="translate(0.45 133.65)"
            >
              <path
                id="Line-5"
                data-name="Line"
                d="M.675,0V5.4"
                transform="translate(10.8)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
              <path
                id="Line-6"
                data-name="Line"
                d="M.675,0V5.4"
                transform="translate(10.8 16.2)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
              <path
                id="Line-7"
                data-name="Line"
                d="M.675,0V5.4"
                transform="translate(0.675 11.475) rotate(-90)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
              <path
                id="Line-8"
                data-name="Line"
                d="M.675,0V5.4"
                transform="translate(16.875 11.475) rotate(-90)"
                fill="none"
                stroke="#02ae9d"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                stroke-width="3.375"
              />
            </g>
            <path
              id="Shape-2"
              data-name="Shape"
              d="M43.649,4.639,15.3.3A57.038,57.038,0,0,1,35.258,1.765a56.354,56.354,0,0,1,8.391,2.872ZM.023,4.1v0c1.2-.485,2.439-.936,3.681-1.34C5.41,2.2,7.158,1.727,8.9,1.34Z"
              transform="matrix(0.719, -0.695, 0.695, 0.719, 37.619, 65.734)"
              fill="#fff"
              stroke="#02ae9d"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="3.375"
            />
            <motion.path
              id="Path_7"
              data-name="Path 7"
              d="M7.329,18.7c-1.966-1.771-2.941-.411-4.737,1.528S-1.141,23.951.825,25.722l22.691,20.44a6.817,6.817,0,0,0,9.536-.425c.105-.115.105-.115.207-.234L47.42,28.708,65.641,7.1c1.7-2.019-.46-3.411-2.508-5.089s-3.2-3.009-4.907-.99L27.782,37.125Z"
              transform="translate(59.245 72.246)"
              fill="#02ae9d"
              stroke="#02ae9d"
              stroke-miterlimit="10"
              stroke-width="3.375"
              initial={{ pathLength: 0, opacity: 0}}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2 }}
            />
          </g>
        </g>
      </svg>
      <Button className="btn-success" title="Sign in" onClick={onClick} />
    </StyledSuccessWindow>
  );
};

export default SuccessWindow;
