import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

// import "./Table.css";

export const Table_01 = ({ rows, deleteRow, editRow, setModalOpen }) => {
  const editRowHandler = (idx) => {
    editRow(idx);
    setModalOpen(true);
  };
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Dep%</th>
            <th>Item Name</th>
            <th className="">HSN Code</th>
            <th>Remark</th>
            <th>Estimate</th>
            <th>Assessed</th>
            <th>QE-QA</th>
            <th>Bill Sr.</th>
            <th>GST%</th>
            <th>Total</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}>
                <td>1</td>
                <td>0</td>
                <td>{row.page}</td>
                <td>abc</td>
                <td>65989</td>
                <td>766</td>
                <td>65</td>
                <td>8977</td>
                <td>8768</td>
                <td>8778686</td>
                <td>878787787</td>
                <td className="expand">{row.description}</td>
                {/* <td>
                  <span className={`label label-${row.status}`}>
                    {statusText}
                  </span>
                </td> */}
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRowHandler(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
