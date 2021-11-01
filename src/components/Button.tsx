import React from 'react';

type ButtonType = {
  className: string;
  onClick: () => void;
};

const Button: React.FC<ButtonType> = ({ children, className, onClick }) => {
  return (
    <button
      className={` bg-primary text-white flex items-center py-3 px-3 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
