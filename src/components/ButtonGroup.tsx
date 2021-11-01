import React from 'react';

type ButtonGroupType = {
  tabs: string[];
  value: number;
  setDayTab: React.Dispatch<React.SetStateAction<number>>;
};
const ButtonGroup: React.FC<ButtonGroupType> = ({ tabs, value, setDayTab }) => {
  return (
    <div className="border border-black w-fit-content rounded-md ">
      <ul className="flex items-center">
        {tabs.map((item, i) => (
          <li
            key={'item'}
            className={`py-2 px-4 cursor-pointer ${
              i !== tabs.length - 1 && 'border-r border-black '
            } ${value === i && 'text-primary'}`}
          >
            <button onClick={(): void => setDayTab(i)}>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ButtonGroup;
