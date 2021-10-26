import React from 'react';
import propTypes from 'prop-types';

type TableType = {
  withCheckBox: boolean;
  withAction: boolean;
  columns: { id: string; name: string; desktopWidth: string }[];
  rows: {
    tasks: string;
    status: string;
    date: string;
    time: string;
  }[];
};
const Table: React.FC<TableType> = ({
  withCheckBox,
  withAction,
  columns,
  rows,
}) => {
  return (
    <table className="border-t border-black w-full border-opacity-10">
      <tr className="w-full border-b border-black border-opacity-10 text-left ">
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
            className="w-2/12 py-5 text-gray-500 font-normal text-base"
          />
        )}
      </tr>
      {rows.map((row, i) => (
        <tr
          key={i}
          className="w-full text-left text-gray-500 font-normal text-base border-b border-black border-opacity-10"
        >
          {withCheckBox && (
            <td className="py-8 text-center">
              <input type="checkbox" />
            </td>
          )}

          {columns.map((column) => (
            <td
              key={column.id}
              className="py-8 font-medium text-gray-900 text-base"
            >
              <div
                className={`${
                  row.status === 'In Progress' ? 'bg-blue-600' : 'bg-yellow-500'
                } px-3 py-2 text-white rounded-full w-fit-content font-bold`}
              >
                {row.status}
              </div>
              {/* {column.name 
                ? column.onRender(row, column.id)
                : row[column.id]} */}
            </td>
          ))}
          {/*<td>*/}

          {/*</td>*/}
          {/*<td className="py-8 font-medium text-gray-900 text-base">21 October 2020</td>*/}
          {/*<td className="py-8 font-medium text-gray-900 text-base">09:30 am</td>*/}

          {withAction && (
            <td className="py-8 font-medium text-gray-900 text-base">
              <div className="flex items-center justify-center">
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-black hover:bg-opacity-4">
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
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-black hover:bg-opacity-4">
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
