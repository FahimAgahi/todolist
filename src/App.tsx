import React, { useState } from 'react';
import Main from './layout/Main';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Table from './components/Table';

const App: React.FC = () => {
  const [statusTab, setStatusTab] = useState<number>(0);
  const [dayTab, setDayTab] = useState<number>(0);

  const handleStatusTab = (val: number): number => {
    setStatusTab(val);
    return val;
  };

  const handleDayTab = (val: number): number => {
    setDayTab(val);
    return val;
  };
  const tabs = ['Month', 'Week', 'Day'];

  const rows = [
    {
      tasks: 'Task #1',
      status: 'paused',
      date: '21 October 2020',
      time: '09:30 am',
    },
    {
      tasks: 'Task #2',
      status: 'In Progress',
      date: '22 October 2020',
      time: '10:30 am',
    },
  ];
  const columns = [
    {
      id: 'tasks',
      name: 'Tasks',
      desktopWidth: '3/12',
    },
    {
      id: 'status',
      name: 'Status',
      desktopWidth: '2/12',
    },
    {
      id: 'date',
      name: 'Date',
      desktopWidth: '2/12',
      // onRender:(data:String) => {
      //     return(
      //         <>
      //             {data}
      //         </>
      //     )
      // }
    },
    {
      id: 'time',
      name: 'Time',
      desktopWidth: '2/12',
    },
  ];
  return (
    <Main>
      <div className="py-12 container mx-auto">
        <div className={'relative mb-10'}>
          <Button className=" right-0 -top-8">
            <svg
              className="text-white text-opacity-70 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              width="19.779"
              height="19.779"
              viewBox="0 0 19.779 19.779"
            >
              <path
                fill="currentColor"
                d="M18.131,8.241H11.538V1.648a1.648,1.648,0,1,0-3.3,0V8.241H1.648a1.648,1.648,0,1,0,0,3.3H8.241v6.593a1.648,1.648,0,1,0,3.3,0V11.538h6.593a1.648,1.648,0,1,0,0-3.3Z"
              />
            </svg>
            Add Task
          </Button>
        </div>
        <div className={'flex item-center justify-end'}>
          <ButtonGroup
            tabs={tabs}
            value={dayTab}
            onClick={(): number => handleDayTab(0)}
          ></ButtonGroup>
        </div>
        <div>
          <ul className="flex items-center text-center border-b border-black border-opacity-10 w-full">
            <li
              className={`w-48 cursor-pointer rounded-t-md mr-1 py-4 border border-black border-opacity-10 border-b-0 relative  ${
                statusTab === 0
                  ? 'bg-white text-primary font-medium'
                  : 'bg-gray-50'
              }`}
            >
              <button onClick={(): number => handleStatusTab(0)}>To Do</button>
              {
                statusTab === 0 && (
                  <div className="h-px bg-white w-full absolute left-0 w-full -bottom-px" />
                ) /* the white line beneath the ToDo */
              }
            </li>
            <li
              className={`w-48 cursor-pointer rounded-t-md mr-1 py-4 border border-black border-opacity-10 border-b-0 relative ${
                statusTab === 1
                  ? 'bg-white text-primary font-medium'
                  : 'bg-gray-50'
              }`}
            >
              <button onClick={(): number => handleStatusTab(0)}>
                Done Tasks
              </button>

              {
                statusTab === 1 && (
                  <div className="h-px bg-white w-full absolute left-0 w-full -bottom-px" />
                ) /* the white line beneath the DoneTask */
              }
            </li>
          </ul>
        </div>
        <div className="mt-4 ml-4 mt-12">
          <Table rows={rows} columns={columns} withCheckBox withAction />
        </div>
      </div>
    </Main>
  );
};

export default App;
