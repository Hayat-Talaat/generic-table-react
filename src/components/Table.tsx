import React from "react";
import { TableProps } from "../types/TableTypes";

const GenericTable = <T,>({ data, columns, actions }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, idx) => (
              <th key={idx} className="border border-gray-300 px-4 py-2">
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-4 py-2">
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : (row[col.accessor] as React.ReactNode)}{" "}
                </td>
              ))}
              {actions && (
                <td className="border border-gray-300 px-4 py-2">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
