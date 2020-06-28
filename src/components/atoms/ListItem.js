import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

const ListItem = (props) => {
  const { onClick, isActive, icon, title, dataIndex, destination } = props;
  return (
        <li onClick = {onClick} data-index = {dataIndex}>
          <Link className={isActive ? "link active" : "link"} to = {destination}>
            <img className="nav-icon" src={icon} alt="navigation icon" />
            <span>{title}</span>
          </Link>
        </li>
  );
};

ListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    dataIndex: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired
}

export default ListItem;
