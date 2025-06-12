import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import { deleteUser } from "./redux/userSlice";
const Users = () => {
  const users = useSelector((state) => state.users.users);
  console.log(useSelector((state) => state.users.users));
  const dispatch = useDispatch();
  function handleDelete(id) {
    axios
      .delete("http://localhost:3001/deleteuser/" + id)
      .then(() => {
        dispatch(deleteUser({ id })); // Dispatch the deleteUser action with the id
        console.log();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="d-flex vh-100  bg-primary justify-content-center align-items-center">
      <div className="w-75 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm ">
          Add+
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td> {user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/edit/${user.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
