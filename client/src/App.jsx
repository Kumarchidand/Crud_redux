import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Users from "./Users";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001");
        dispatch(getUsers(response.data));
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData(); //call the async func
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path='/edit/:id' element={<UpdateUser/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
