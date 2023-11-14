import { useNavigate } from "react-router-dom";
import { AuthProvider, AppState } from "@pangeacyber/react-auth";

import Router from "@src/components/Router";
import './scss/styles.scss';

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || "";
const CLIENT_TOKEN = process.env.REACT_APP_CLIENT_TOKEN || "";
const PANGEA_DOMAIN = process.env.REACT_APP_PANGEA_DOMAIN || "";

const App = () => {
  const navigate = useNavigate();

  const authConfig = {
    clientToken: CLIENT_TOKEN,
    domain: PANGEA_DOMAIN,
  };

  const handleLogin = (appData: AppState) => {
    navigate(appData.returnPath);
  };

  if (!authConfig.clientToken || !authConfig.domain) {
    return (
      <html lang="en">
        <head />
        <body style={{ padding: "40px", textAlign: "center" }}>
          <h2>
            Please configure your environment variables. See the README for
            more...
          </h2>
        </body>
      </html>
    );
  }

  return (
    <AuthProvider
      config={{
        domain: PANGEA_DOMAIN,
        clientToken: CLIENT_TOKEN,
        useJwt: false
      }}
      cookieOptions={{
        useCookie: true,
        cookieName: "pangea-sample"
      }}
      onLogin={handleLogin}
      loginUrl={LOGIN_URL}
      useStrictStateCheck={false}
    >
      <Router />
    </AuthProvider>
  );
};

export default App;
