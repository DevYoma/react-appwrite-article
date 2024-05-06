import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { account } from "../appwriteConfig";
import { UserAuthContext } from "../context/UserAuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      <div className="navLogo">Logo</div>

      <Link to="/" className="navHomeLink">
        Home
      </Link>
      {user ? (
        <button onClick={handleLogout} className="navLoginButton">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} className="navLoginButton">
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
