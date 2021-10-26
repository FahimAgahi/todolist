import React from 'react';

type ButtonType = {
  className: string;
};

const Button: React.FC<ButtonType> = ({ children, className }) => {
  return (
    <button
      className={` bg-primary text-white flex items-center py-3 px-3 rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
