import React, { useState } from "react";

const TableData = ({ allInfo }) => {
  const getCurrentClass = (state) => {
    if (String(state).toLowerCase() === "safe") {
      return "text-success";
    }
    if (
      String(state).toLowerCase() === "broken" ||
      String(state).toLowerCase() === "major dent" ||
      String(state).toLowerCase() === "rusted"
    ) {
      return "text-danger";
    }
    return "text-info";
  };
  const getTableData = () => {
    let updatedData = [];
    allInfo?.reportPartsDetails?.forEach((part, index) => {
      let newPart = {
        partName: part?.PartName,
        partState: part?.PartState,
        currentClass: getCurrentClass(part.PartState),
      };
      updatedData.push(newPart);
    });

    // Calculate the middle index
    const middleIndex = Math.ceil(updatedData.length / 2);

    // Split the array into two halves
    const firstHalf = updatedData.slice(0, middleIndex);
    const secondHalf = updatedData.slice(middleIndex);

    return { firstHalf, secondHalf };
  };
  return (
    <>
    <hr />
      <hr />
      <h4
            className="text-primary"
            style={{ textDecoration: "underline", fontSize: "22px" }}
          >
            Vehicle Parts :-
          </h4>
      <div
        className=" mt-2"
        style={{
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <table
          className="striped-table"
          style={{ width: "100%", border: "1px solid red" }}
        >
          <tr>
            <td style={{ width: "50%" }}>
              <div>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th className="text-primary"> Vehicle Parts</th>
                    <th className="text-primary"> Info</th>
                  </tr>
                  {getTableData().firstHalf.map((part, index) => {
                    return (
                      <tr key={index}>
                        <td>{part.partName}</td>
                        <td className={`${part.currentClass} fw-bold`}>
                          {part.partState}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </td>
            <td style={{ width: "50%" }}>
              <div>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th className="text-primary"> Vehicle Parts</th>
                    <th className="text-primary"> Info</th>
                  </tr>
                  {getTableData().secondHalf.map((part, index) => {
                    return (
                      <tr key={index}>
                        <td>{part.partName}</td>
                        <td className={`${part.currentClass} fw-bold`}>
                          {part.partState}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default TableData;
