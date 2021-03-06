import React from 'react';
import propTypes from 'prop-types';
import { Row } from '../App';

type TableType = {
  withCheckBox: boolean;
  withAction: boolean;
  columns: { id: string; name: string; desktopWidth: string }[];
  rows: Row[];
  backUpRows: Row[];
  onEditAction: (d: Row) => void;
  onDeleteAction: (id: string) => void;
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  setFilterRows: React.Dispatch<React.SetStateAction<Row[]>>;
  filterRows: Row[];
};

const Table: React.FC<TableType> = ({
  withCheckBox,
  withAction,
  columns,
  rows,
  onEditAction,
  onDeleteAction,
  setRows,
  setFilterRows,
  filterRows,
  backUpRows,
}) => {
  const changeStatus = (rowInput: Row): void => {
    setFilterRows(
      filterRows.map((row) =>
        row.id === rowInput.id &&
        (row.status === 'In Progress' || row.status === 'Paused')
          ? {
              ...row,
              checked: !row.checked,
              status: 'Done',
            }
          : row.id === rowInput.id && row.status === 'Done'
          ? {
              ...row,
              checked: !row.checked,
              status: 'In Progress',
            }
          : row,
      ),
    );
    setRows(
      rows.map((row) =>
        row.id === rowInput.id &&
        (row.status === 'In Progress' || row.status === 'Paused')
          ? {
              ...row,
              checked: !row.checked,
              status: 'Done',
            }
          : row.id === rowInput.id && row.status === 'Done'
          ? {
              ...row,
              checked: !row.checked,
              status: 'In Progress',
            }
          : row,
      ),
    );
  };
  return (
    <table className="border-t border-black w-full border-opacity-10">
      <tbody>
        <tr className="w-full border-b border-black  text-left ">
          {withCheckBox && (
            <th
              key={'checkbox'}
              className="w-1/12 py-5 text-gray-500 font-normal text-base"
            />
          )}
          {columns.map((item, i) => (
            <th
              key={i}
              className={`md:w-${item.desktopWidth} py-5 text-gray-500 font-normal text-base`}
            >
              {item.name}
            </th>
          ))}
          {withAction && (
            <th
              key={'action'}
              className="w-2/12 py-5 text-gray-500 font-normal text-base "
            />
          )}
        </tr>
        {backUpRows.map((row) => (
          <tr
            key={row.id}
            className="w-full text-left text-black font-normal text-base border-b border-black"
          >
            {withCheckBox && (
              <td className="py-8 text-center">
                <input
                  type="checkbox"
                  checked={row.checked}
                  onChange={(): void => changeStatus(row)}
                />
              </td>
            )}
            <td className="py-8 text-left">{row.tasks}</td>
            <td className="py-8 text-left">
              <div
                className={`${
                  row.status === 'In Progress'
                    ? 'bg-buttonBlue'
                    : row.status === 'Paused'
                    ? 'bg-yellow-500'
                    : row.status === 'Done'
                    ? 'bg-green-400'
                    : ''
                } px-5 py-2 text-white rounded-full w-fit-content font-bold inline-block`}
              >
                {row.status}
              </div>
            </td>
            <td className="py-8 text-left">{row.date}</td>
            <td className="py-8 text-left">{row.time}</td>

            {withAction && (
              <td className="py-8 font-medium text-gray-900 text-base ">
                <div className="flex items-center justify-center">
                  <button
                    className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 "
                    onClick={(): void => onEditAction(row)}
                  >
                    <svg
                      className="text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.517"
                      height="20.517"
                      viewBox="0 0 20.517 20.517"
                    >
                      <path
                        fill="currentColor"
                        d="M19.976,5.767,18.128,7.614a.481.481,0,0,1-.681,0L13,3.166a.481.481,0,0,1,0-.681L14.846.637a1.928,1.928,0,0,1,2.721,0l2.408,2.408A1.92,1.92,0,0,1,19.976,5.767Zm-8.564-1.7L.888,14.595l-.85,4.869a.963.963,0,0,0,1.114,1.114l4.869-.854L16.545,9.2a.481.481,0,0,0,0-.681L12.1,4.071a.486.486,0,0,0-.685,0ZM3.549,17.064H5.473v1.455l-2.585.453L1.642,17.725l.453-2.585H3.549Z"
                        transform="translate(-0.024 -0.075)"
                      />
                    </svg>
                  </button>
                  <button
                    className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100"
                    onClick={(): void => onDeleteAction(row.id)}
                  >
                    <svg
                      className="text-red-500"
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.prototype = {
  withCheckBox: propTypes.bool,
  withAction: propTypes.bool,
  columns: propTypes.array,
  rows: propTypes.array,
};

export default Table;
