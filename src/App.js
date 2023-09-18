import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout/Layout.js";
import Home from "./pages/Home/Home.js";
import Profile from './pages/Profile/Profile.js';
import { userContext } from './contexts/userContext.js';

function App() {
  const [user, setUser] = useState({
      Username: "",
      SessionId: ""
    });

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <userContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='profile' element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;