import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import Nodata from "./nodata";
const Table = ({
  data,
  toggleSelectAllData,
  toggleSelectData,
  selectedData,
  handleEditDataInfo,
  handleSaveEditedData,
  handleCancelEdit,
  handleDeleteData,
  rowClick,
  dataToEdit,
  setDataToEdit,
  isEditFormVisible,
}) => {
  return (
    <div>
      {isEditFormVisible && (
        <div className="editform">
          <h3>EDIT INFO</h3>
          <form onSubmit={handleSaveEditedData}>
            <label>
              Name :
              <input
                type="text"
                value={dataToEdit.name}
                onChange={(e) =>
                  setDataToEdit({ ...dataToEdit, name: e.target.value })
                }
              />
            </label>
            <label>
              Email :
              <input
                type="text"
                value={dataToEdit.email}
                onChange={(e) =>
                  setDataToEdit({ ...dataToEdit, email: e.target.value })
                }
              />
            </label>
            <label>
              role :
              <input
                type="text"
                value={dataToEdit.role}
                onChange={(e) =>
                  setDataToEdit({ ...dataToEdit, role: e.target.value })
                }
              />
            </label>
            <div className="editform-button">
              <button type="submit">Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {data.length ? (
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleSelectAllData}
                  checked={toggleSelectAllData}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} onClick={() => rowClick(user)}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleSelectData(user.id)}
                    checked={selectedData.includes(user.id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div>
                    <button onClick={() => handleEditDataInfo(user)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                    <button onClick={() => handleDeleteData(user.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          color: "red",
                        }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Nodata />
      )}
    </div>
  );
};

export default Table;
