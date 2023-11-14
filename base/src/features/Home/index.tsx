import { useAuth } from "@pangeacyber/react-auth";
import { getDateTime } from "../../utils";

const Home = () => {
  const { authenticated, user } = useAuth();
  const loginLoc = user?.profile["Last-Login-City"] ? `${user.profile["Last-Login-City"]}, ${user.profile["Last-Login-Country"]}` : "Unknown"
  const loginIP = user?.profile["Login-From"];
  const loginTime = getDateTime(user?.profile["Login-Time"]);


  return (
    <div className="home">
      <h1>Home</h1>
      <div style={{ marginBottom: "16px" }}>
        {authenticated ?
          (<span className="success">Authenticated</span>) :
          (<span className="warn">Unauthenticated</span>)
        }
      </div>
      {!!user &&
        <div>
          <h5>Last Login</h5>
          <div>{loginTime}</div>
          {loginLoc && <div>{loginLoc}</div>}
          <div>{loginIP}</div>
        </div>
      }
    </div>
  );
}

export default Home;