import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
      
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went Wrong")
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    } catch (err) {
            setError(err?.response?.data || "Something went Wrong");

    }
  }
  
  return (
    <div className="flex justify-center">
      <div
        className="card bg-base-300 "
        style={{ margin: "20px", marginBottom: "100px" }}
      >
        <div className="card-body" style={{ width: "350px" }}>
          <h1 className="flex justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h1>
          {!isLoginForm && (
            <>
              <label htmlFor="firstName">First Name : </label>
              <input
                type="text"
                placeholder="Enter your First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="justify-center"
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "20px",
                  borderRadius: "5px",
                }}
              />
              <label htmlFor="lastName">Last Name : </label>
              <input
                type="text"
                placeholder="Enter your Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="justify-center"
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "20px",
                  borderRadius: "5px",
                }}
              />
            </>
          )}
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

          <p style={{ color: "red" }}>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-info" onClick={isLoginForm?handleLogin:handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p style={{textAlign:"center"}}>
            {isLoginForm ? (
              <>
                Don't have an account?{" "}
                <span
                  style={{
                    color: "#0ea5e9",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => setIsLoginForm((value) => !value)}
                >
                  Sign up here.
                </span>
              </>
            ) : (
              <>
                Already have an account?{"  "}
                <span
                  style={{
                    color: "#0ea5e9",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => setIsLoginForm((value) => !value)}
                >
                  Login here.
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
