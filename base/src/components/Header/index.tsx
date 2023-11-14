import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@pangeacyber/react-auth";

const Header = () => {
  const { authenticated, login, logout } = useAuth();

  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    logout();
  }

  return (
    <div className="header">
      <img src="/newp.PNG" alt="Pangea Logo"  style={{ width: '100px', height: 'auto' }} />
      {authenticated && (
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </div>
      )}
      {authenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

export default Header;
