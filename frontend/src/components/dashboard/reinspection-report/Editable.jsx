import React, { useState } from "react";

const EditableTable = ({data,setData}) => {
  const [hsh,setHsh] = useState("");
  const [estimate,setEstimate]=useState(0);
  const [assessed,setAssessed] = useState(0);

  const [editIndex, setEditIndex] = useState(null);

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = () => {
    setEditIndex(null);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  return (
    <div className="smartTable-container row">
      <div className="smartTable-tableContainer">
        <table>
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
            {data.map((row, index) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  {editIndex === index ? (
                    <input
                      className="table-input"
                      type="text"
                      value={row.age}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={row.name}
                      onChange={(e) =>
                        handleInputChange(index, "age", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.age
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      className="table-input"
                      type="text"
                      value={row.age}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.age
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={row.age}
                      onChange={(e) =>
                        handleInputChange(index, "age", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      className="table-input"
                      type="number"
                      value={row.age}
                      onChange={(e) =>
                        handleInputChange(index, "age", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.age
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      className="table-input"
                      type="number"
                      value={row.age}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={row.age}
                      onChange={(e) =>
                        handleInputChange(index, "age", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.age
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={row.age}
                      onChange={(e) =>
                        handleInputChange(index, "age", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.age
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      disabled={editIndex === index ? false : true}
                    />
                  ) : (
                    row.name
                  )}
                </td>

                <td>
                  {editIndex !== index ? (
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  ) : (
                    <button onClick={handleSaveClick}>Save</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable;
