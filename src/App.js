import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout/Layout.js";
import Home from "./pages/Home/Home.js";
import Profile from './pages/Profile/Profile.js';
import { userContext } from './contexts/userContext.js';
import { loansContext } from './contexts/loansContext';

function App() {
  const [user, setUser] = useState({
      Username: "",
      SessionId: ""
    });
    const [loanOffers, setLoanOffers] = useState([]);
    const [loanRequests, setLoanRequests] = useState([]);

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <loansContext.Provider value={{loanOffers, setLoanOffers, loanRequests, setLoanRequests}}>
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
    </loansContext.Provider>
  );
}

export default App;