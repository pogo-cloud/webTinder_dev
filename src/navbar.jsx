import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "./utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "./utils/userSlice";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <div className="navbar bg-base-200 fixed top-0 left-0 w-full z-50 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl mx-100">
          daisyUI
        </Link>
      </div>

      <div className="flex-none gap-8">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-32 md:w-64"
        />

        {true && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user"
                  src={user?.photoUrl||`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCiPvyqtrQzWoHU0wPHPClPwBcFEwShqdcQ&s`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
