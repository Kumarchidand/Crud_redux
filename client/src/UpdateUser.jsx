import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const users = useSelector(state => state.users.users);
  const user = users.find(u => u.id === id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAge(user.age);
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/" + id, { name, email, age })
      .then(() => {
        dispatch(updateUser({ id, name, email, age }));
        navigate("/");
      })
      .catch((err) => console.log("Error:", err));
  };

  if (!user) {
    return <div>Loading user data...</div>; // Prevents rendering when user is undefined
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>

          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button className="btn btn-success px-4 py-2">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
