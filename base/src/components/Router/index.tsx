import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import { useAuth } from "@pangeacyber/react-auth";

import Header from "@components/Header";
import Footer from "@components/Footer";

import Status from "@components/Status";
import Home from "@features/Home";
import Profile from "@features/Profile";
// import Info from "@features/Info";

const Router = () => {
  const { authenticated, loading, error, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !error && !authenticated) {
      const redirectPath = `/${window.location.search}`;
      navigate(redirectPath);
    }
  }, [navigate, error, authenticated, loading]);

  if (loading) {
    return (<Status message="Loading..." />);
  } else if (error) {   
    console.warn("Error:", error); 
    logout();
  }
  
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/" element={<Info />} /> */}

        </Routes>
        {authenticated && (
          <div>
            <div
              style={{
                // display: 'flex',
                
                alignItems: 'center',
                marginLeft: '180px',
                marginTop: '-180px',
              
                height: '100%',
                
              }}
            >
              <iframe
                title="pBot"
                src="https://ronlin.pythonanywhere.com/"
                style={{ width: '600px', height: '510px' }}
              />
            </div>


            <div  
            style={{
              // display: 'flex',
              
              alignItems: 'center',
              marginLeft: '800px',
              marginTop: '-520px',
            
              height: '100%',
              
            }}
            >
            <iframe
              title="intel"
              src="https://pangea.onrender.com/"
              style={{ width: '400px', height: '510px' }}
            />
            </div>  
        </div>            
        )}

    {!authenticated && (
      <img
      src="https://i.postimg.cc/7Zq9rLMk/p-Bot1-1.png"
      alt="pBot"
      style={{ width: '800px', height: '500px', marginTop: '-70px', marginLeft: '200px' }}
    />
    )}

      </div>
      <Footer />
    </div>
  );
}

export default Router;