import './Home.css';
import React, { useContext, useEffect, useState } from 'react';
import { loansContext } from '../../contexts/loansContext';
import { userContext } from '../../contexts/userContext';
import { axiosGetLoanOffers, axiosGetLoanRequests } from '../../services/loanServices';
import LoanCard from '../../elements/loanCard/LoanCard';
import { Link } from 'react-router-dom';

function Home() {
	let user = useContext(userContext);
	let loans = useContext(loansContext);
	const [isLoading, setIsLoading] = useState(true);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		if (user.user.SessionId != "") {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
		setIsLoading(false);
	}, [user.user.SessionId]);

	return (
		isLoading ?
			<div className='text-center'>
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
			:
			<>
				<span className='container-fluid homeTitle d-flex w-75 rounded mx-auto mt-5 p-3'>
					<div className='row col text-center'>
						<p className='h1'>Bienvenido!</p>
						<hr></hr>
						{
							!isLogged ?
							<p><b>Inicia sesión para ver los prestamos disponibles o crear los tuyos!</b></p> : 
							<>
								<Link to='/loans'>Ver prestamos</Link>
							</>
						}
					</div>
				</span>
			</>
	);
}
export default Home;