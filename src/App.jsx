import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import MainPage from './pages';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

 
  useEffect(() => {
   
    fetch('https://jsonplaceholder.typicode.com')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error(error));
  }, [isLoggedIn]);

 
  const navigate = useNavigate();

  const handleSignUp = useCallback((username, email, password) => {
  
    setIsLoggedIn(true);
    setUserData({ username, email });
    navigate('/');
  }, [navigate]);

  const handleLogin = useCallback((username, password) => {
   
    setIsLoggedIn(true);
    setUserData({ username });
    navigate('/');
  }, [navigate]);


  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUserData(null);
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<MainPage userData={userData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;