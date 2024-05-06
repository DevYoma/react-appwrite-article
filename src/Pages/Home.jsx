import { useContext } from "react";
import "./Home.css";
import { UserAuthContext } from "../context/UserAuthContext";

const Home = () => {
  const { user } = useContext(UserAuthContext);

  console.log(user);
  
  return (
    <div>
      <h1>Home Page</h1>
      <p>
        This page is a Protected Page and should only be seen by Authenticated
        Users
      </p>
      <h2>Current LoggedIn User </h2>
      <p>Email: {user.email || user?.providerUid}</p>
    </div>
  );
};

export default Home;
