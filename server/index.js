const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Crud");

app.get("/", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});
app.post("/create", (req, res) => {
  // usermodel used to create new record,the data will passsed from fronted isreq.body formate
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.put("/update/:id", (req, res) => {
  // in node to get data from url req.params.id
  const id = req.params.id;
  // lets update with model
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json());
});
app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel
    .findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
