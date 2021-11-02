import React, { useEffect, useState } from 'react';
import Main from './layout/Main';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Table from './components/Table';
import Modal from './components/Modal';

export type Row = {
  id: string;
  tasks: string;
  status: string;
  date: string;
  time: string;
  checked: boolean;
};
const App: React.FC = () => {
  const [statusTab, setStatusTab] = useState<number>(0);
  const handleStatusTab = (val: number): number => {
    setStatusTab(val);
    return val;
  };
  const handleData = (key: string, value: string): void => {
    setData({ ...data, [key]: value });
  };

  const staticRows: Row[] = [
    {
      id: Date.now().toString(),
      tasks: 'Task #1',
      status: 'Paused',
      date: '21 October 2020',
      time: '09:30',
      checked: false,
    },
    {
      id: (Date.now() + 1).toString(),
      tasks: 'Task #2',
      status: 'In Progress',
      date: '21 October 2020',
      time: '10:30',
      checked: false,
    },
  ];

  const [isAddModalOpen, setModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [data, setData] = useState<Row>({
    id: '',
    tasks: '',
    status: '',
    date: '',
    time: '',
    checked: false,
  });
  const handleModal = (val: boolean): void => {
    if (val) {
      setModalOpen(val);
    } else {
      setData({
        id: '',
        tasks: '',
        status: '',
        date: '',
        time: '',
        checked: false,
      });
      setIsEditMode(false);
      setModalOpen(false);
    }
  };

  const [rows, setRows] = useState<Row[]>(staticRows);
  const addNewRow = (): void => {
    setRows([
      ...rows,
      {
        id: Date.now().toString(),
        tasks: data.tasks,
        status: data.status,
        date: convertDateToString(data),
        time: data.time,
        checked: false,
      },
    ]);
    handleModal(false);
  };
  const [backUpRows, setBackUpRows] = useState<Row[]>(rows);
  useEffect(() => {
    if (statusTab === 0) {
      setBackUpRows(rows.filter((row) => (!row.checked ? row : null)));
    } else {
      setBackUpRows(rows.filter((row) => (row.checked ? row : null)));
    }
  }, [rows, statusTab]);

  const [isEditClicked, setEditClicked] = useState<boolean>(false);
  const editRow = (d: Row): void => {
    if (isEditMode) {
      setEditClicked(true);
      setRows([
        ...rows.filter((row) => d.id !== row.id),
        { ...d, date: convertDateToString(d) },
      ]);
    } else {
      setEditClicked(false);
      addNewRow();
    }
    setModalOpen(false);
  };

  const onEditAction = (d: Row): void => {
    setData({ ...d, date: convertStringToDate(d) });
    setIsEditMode(true);
    setModalOpen(true);
    setEditClicked(isEditClicked);
  };

  const onDeleteAction = (id: string): void => {
    setRows(rows.filter((row) => id !== row.id));
  };

  const [dayTab, setDayTab] = useState<number>(0);

  const tabs = ['Month', 'Week', 'Day'];

  const convertDateToString = (input: Row): string => {
    const date = new Date(input.date);
    const today = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return today;
  };
  const convertStringToDate = (input: Row): string => {
    const date = new Date(input.date);
    const tempDate = date.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return tempDate;
  };
  const [filterRows, setFilterRows] = useState<Row[]>(rows);
  const setFilterList = (i: number): void => {
    if (i === 0) {
      filterDate(0);
      setDayTab(0);
    } else if (i === 1) {
      filterDate(1);
      setDayTab(1);
    } else if (i === 2) {
      filterDate(2);
      setDayTab(2);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterDate = (index: number): any => {
    const current = new Date();
    setFilterRows(
      filterRows.map((row) => {
        const date = convertStringToDate(row);
        if (current.getFullYear().toString() === date.split('-')[2]) {
          switch (index) {
            case 0:
              if (current.getMonth().toString() === date.split('-')[0]) {
                return row;
              }
              break;
            case 1:
              if (
                current.getDay() < parseInt(date.split('-')[1]) &&
                parseInt(date.split('-')[1]) < current.getDay() + 7
              ) {
                return row;
              }
              break;
            case 2:
              if (
                current.getDay().toString() === date.split('-')[1] &&
                current.getMonth().toString() === date.split('-')[0]
              ) {
                return row;
              }
          }
        }
        return row;
      }),
    );
  };

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
          <Button
            className="absolute right-0 -top-8"
            onClick={(): void => handleModal(true)}
          >
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
          <div>
            <ul className="flex items-center text-center text-gray-400  border-b border-black  border-gray-400  w-full">
              <li
                className={`w-48 cursor-pointer rounded-t-md mr-1  border border-black  border-b-0 relative  ${
                  statusTab === 0
                    ? 'bg-white text-primary font-medium'
                    : 'bg-gray-100'
                }`}
              >
                <button
                  className="w-full py-3"
                  onClick={(): number => handleStatusTab(0)}
                >
                  To Do
                </button>
                {
                  statusTab === 0 && (
                    <div className="h-px bg-white w-full absolute left-0 w-full -bottom-px" />
                  ) /* the white line beneath the ToDo */
                }
              </li>
              <li
                className={`w-48 cursor-pointer rounded-t-md mr-1 border border-black border-b-0 relative ${
                  statusTab === 1
                    ? 'bg-white text-primary font-medium'
                    : 'bg-gray-100'
                }`}
              >
                <button
                  className="w-full py-3"
                  onClick={(): number => handleStatusTab(1)}
                >
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
        </div>

        <div className={'flex item-center justify-end'}>
          <ButtonGroup
            setFilterList={setFilterList}
            tabs={tabs}
            value={dayTab}
          ></ButtonGroup>
        </div>
        <div className="mt-4 ml-4 mt-12">
          <Table
            backUpRows={backUpRows}
            rows={rows}
            setRows={setRows}
            columns={columns}
            onEditAction={onEditAction}
            onDeleteAction={onDeleteAction}
            withCheckBox
            withAction
          />
        </div>
        {isAddModalOpen && (
          <Modal
            isAddModalOpen={isAddModalOpen}
            handleModal={handleModal}
            className=""
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block">
                  Task Name :{' '}
                  <input
                    value={data?.tasks}
                    onChange={(e): void => handleData('tasks', e.target.value)}
                    className="border rounded-md py-2 px-4 outline-none border-black "
                    placeholder={'Example: Task #1'}
                  />
                </label>
              </div>
              <div>
                <label className="mb-1 block">
                  Status :{' '}
                  <select
                    defaultValue={data?.status}
                    onBlur={(e): void => handleData('status', e.target.value)}
                    className="border w-full bg-white rounded-md py-2 px-4 outline-none border-black "
                  >
                    <option value={'In Progress'}>In Progress</option>
                    <option value={'Paused'}>Paused</option>
                  </select>{' '}
                </label>
              </div>
              <div>
                <label className="mb-1 block">
                  Date :{' '}
                  <div className="">
                    <input
                      className="border-2 rounded-md px-3 py-2 outline-none focus:border-gray-400 flex-grow"
                      value={data?.date}
                      onChange={(e): void => handleData('date', e.target.value)}
                      type="date"
                      form="DD-MM-YYYY"
                    />
                  </div>
                </label>
              </div>
              <div>
                <label className="mb-1 block">
                  Time :
                  <input
                    value={data?.time}
                    onChange={(e): void => handleData('time', e.target.value)}
                    type={'time'}
                    className="w-full border rounded-md py-2 px-4 outline-none border-blue"
                    placeholder={'__:__'}
                  />{' '}
                </label>
              </div>
            </div>
            <div className="flex mt-4 w-full items-center justify-end">
              <button
                onClick={(): void => handleModal(false)}
                className="border border-black  rounded-lg py-2 px-4"
              >
                Close
              </button>
              <button
                className="bg-primary disabled:bg-gray-500 rounded-lg py-2 px-5 text-white ml-4"
                disabled={!data?.time || !data?.status || !data?.tasks}
                // doesn't let the user to save the info unless all of the properties are filled.
                onClick={(): void => editRow(data)}
              >
                {isEditMode ? 'Edit' : 'Add'}
              </button>
            </div>
          </Modal>
        )}
      </div>
    </Main>
  );
};

export default App;
