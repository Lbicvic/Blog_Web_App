import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header>
      {localStorage.getItem("user") && (
        <div className="header__content">
          <div className="header__title">
            <Link to="/homepage">
              <h2>Blog App</h2>
            </Link>
          </div>
          <nav className="nav">
            <div className="nav__links">
              <Link to="/newBlog"> Post New Blog </Link>
            </div>
            {currentUser && <p className="text-italic">{currentUser.username}</p>}
            <button onClick={handleLogout}>Log out</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
