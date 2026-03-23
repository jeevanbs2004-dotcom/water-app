import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

function Navbar() {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (user) {
            axios.post(
                "https://demo-blog.mashupstack.com/api/logout",
                {},
                {
                    headers: { Authorization: "Bearer " + user.token },
                }
            );

            dispatch(removeUser());
            navigate("/login");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                
                <span className="navbar-brand">Water Tracker</span>

                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">

                        {user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">
                                        Home
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/add" className="nav-link">
                                        Add
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/difference" className="nav-link">
                                        Difference
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <span
                                        className="nav-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={logout}
                                    >
                                        Logout
                                    </span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">
                                        Login
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/logout" className="nav-link">
                                        Logout
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;