import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
       await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(clearFeed());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm ">
      <div className="flex-1">
        <h2
          className="btn btn-outline btn-info text-xl cursor-pointer"
          onClick={() => {
            if (user) {
              navigate("/");
            } else {
              navigate("/login");
            }
          }}
        >
          👨‍💻 DevTinder
        </h2>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div
            className="dropdown dropdown-end"
            style={{ marginRight: 50, marginTop: 15 }}
          >
            <div className="inline-flex" style={{ marginRight: "20px" }}>
              Welcome , {user.firstName}
            </div>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between no-underline"
                  style={{ color: "white" }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="no-underline"
                  style={{ color: "white" }}
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="no-underline"
                  style={{ color: "white" }}
                >
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
