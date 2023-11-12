import './App.css';
import { useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout/Layout.js";
import Home from "./pages/Home/Home.js";
import Profile from './pages/Profile/Profile.js';
import ValidateUser from './pages/validateUser/ValidateUser';
import Loan from './pages/Loan/Loan.js';
import { userContext } from './contexts/userContext.js';
import { loansContext } from './contexts/loansContext';

function App() {
  const [user, setUser] = useState({
      Username: "",
      SessionId: ""
    });
    const [loanOffers, setLoanOffers] = useState([]);
    const [loanRequests, setLoanRequests] = useState([]);

  return (
    <loansContext.Provider value={{loanOffers, setLoanOffers, loanRequests, setLoanRequests}}>
    <userContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='profile' element={<Profile/>} />
            <Route path='validateUser' element={<ValidateUser/>}/>
            <Route path='loan/:id/:type' element={<Loan/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
    </loansContext.Provider>
  );
}

export default App;