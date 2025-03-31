import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("bavnit@gmail.com");
  const [password, setPassword] = useState("Bavnit@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      //  console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center" style={{ margin: "100px" }}>
      <div className="card bg-base-200 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label htmlFor="Email">Email : </label>
          <input
            type="text"
            placeholder=" Enter your Email"
            value={emailId}
            className="justify-center"
            onChange={(e) => setEmailId(e.target.value)}
            style={{
              padding: "10px",
              margin: "5px",
              height: "20px",
              borderRadius: "5px",
            }}
          />

          <label htmlFor="Password">Password : </label>
          <input
            type="text"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="justify-center"
            style={{
              padding: "10px",
              margin: "5px",
              height: "20px",
              borderRadius: "5px",
            }}
          />
          <div className="card-actions justify-center">
            <button className="btn btn-info" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
