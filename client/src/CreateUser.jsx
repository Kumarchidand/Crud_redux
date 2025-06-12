import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // ✅ fixed typo
 // so in form onsumbit  is defined,first remove the default behavioutr after that we will pass our data to the backend
  // so we will use axios to make a post request to the backend
    axios
      .post("http://localhost:3001/create", { name, email, age })
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => console.log("Error:", err));
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-25 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>

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

          <button className="btn btn-success px-4 py-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
