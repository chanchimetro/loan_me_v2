import './Loans.css'
import React, { useContext, useEffect, useState } from 'react';
import { loansContext } from '../../contexts/loansContext';
import { userContext } from '../../contexts/userContext';
import { axiosGetLoanOffers, axiosGetLoanRequests } from '../../services/loanServices';
import LoanCard from '../../elements/loanCard/LoanCard';

const getLoansInfo = async (SessionId, setIsLoading, setLoanOffers, setLoanRequests) => {
	try {
		let r = await axiosGetLoanOffers(SessionId);
		setLoanOffers(r.data);
		console.log(r.data);
		r = await axiosGetLoanRequests(SessionId);
		setLoanRequests(r.data);
		console.log(r.data)
		setIsLoading(false);
	} catch (e) {
		console.log(e);
	}
}

function Loans() {
	let user = useContext(userContext);
	let loans = useContext(loansContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getLoansInfo(user.user.SessionId, setIsLoading, loans.setLoanOffers, loans.setLoanRequests);
	}, []);

	useEffect(() => {
		console.log(loans);
	}, [loans.loanOffers, loans.loanRequests])

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
						<div className='col'>
							<p className='h3'>Ofertas</p>
							{
								loans.loanOffers.length > 0 ? loans.loanOffers.map((x)=><LoanCard info={x}></LoanCard>) : <p className='text-muted'>No hay ofertas actualmente...</p>
							}
						</div>
						<div className='col'>
							<p className='h3'>Peticiones</p>
							{
								loans.loanRequests.length > 0 ? loans.loanRequests.map((x)=><LoanCard info={x}></LoanCard>) : <p className='text-muted'>No hay peticiones actualmente...</p>
							}
						</div>
					</div>
				</span>
			</>
	);
}
export default Loans;