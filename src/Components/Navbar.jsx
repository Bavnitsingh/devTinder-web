import { useSelector } from "react-redux";

const Navbar = () => {

  const user = useSelector((store) => store.user)
  console.log(user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-outline btn-info">👨‍💻 DevTinder</a>
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;