import React from 'react';

type ButtonGroupType = {
  tabs: string[];
  value: number;
  onClick: React.MouseEventHandler;
};
const ButtonGroup: React.FC<ButtonGroupType> = ({ tabs, value, onClick }) => {
  return (
    <div className="border border-black  w-fit-content border-opacity-10 rounded-md ">
      <ul className="flex items-center">
        {tabs.map((item, i) => (
          <li
            key={'item'}
            className={`py-2 px-4 cursor-pointer ${
              i !== tabs.length - 1 && 'border-r border-black border-opacity-10'
            } ${value === i && 'text-primary'}`}
          >
            <button onClick={onClick}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ButtonGroup;
