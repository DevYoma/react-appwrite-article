import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../context/UserAuthContext";

const Login = () => {
  const { setUser, user } = useContext(UserAuthContext)
  // console.log(user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  
  useEffect(() => {
    if(user !== null){
       navigate("/");
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    setButtonLoading(true)
    e.preventDefault();
    if (password === "" || email === "") {
      alert("Please fill in the field required");
      setButtonLoading(false)
      return;
    } 

    // Call Appwrite function to handle login with email and password
    const promise = account.createEmailPasswordSession(email, password);

    promise.then(
      function (response) {
        console.log(response); // Success
        setUser(response);
        navigate("/")
        setButtonLoading(false)
      },
      function (error) {
        console.log(error); // Failure
        alert(error.message)
        setButtonLoading(false);
      }
    );

  };

  return (
    <div className="loginPage">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          type="submit"
        >
          {buttonLoading ? "Loading..." : "Login"}
        </button>

        <div>
          Dont have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
