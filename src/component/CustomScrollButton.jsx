// CustomScrollButton.jsx
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CustomScrollButton = ({ direction, onClick }) => {
  const Icon = direction === 'up' ? FaArrowUp : FaArrowDown;
  const buttonStyle = {
    position: 'fixed',
    bottom: direction === 'up' ? '80px' : '20px',
    right: '20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  return (
    <button onClick={onClick} style={buttonStyle}>
      <Icon />
    </button>
  );
};

CustomScrollButton.propTypes = {
  direction: PropTypes.oneOf(['up', 'down']).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomScrollButton;