import './Loans.css'
import React, { useContext, useEffect, useState } from 'react';
import { loansContext } from '../../contexts/loansContext';
import { userContext } from '../../contexts/userContext';
import { axiosGetLoanOffers, axiosGetLoanRequests } from '../../services/loanServices';
import LoanCard from '../../elements/loanCard/LoanCard';
import LoanForm from '../../elements/loanForm/loanForm';

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
	let UserType = user.user.UserType;
	const [isLoading, setIsLoading] = useState(true);
	const [str, setStr] = useState("");


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
							<div className='row d-flex justify-content-center'>
								<div className='h3 col-3'>Ofertas</div>
								{
									UserType === "Prestamista" ?
										<span className='col-1'>
											<button className='btn btn-secondary fw-semibold' data-bs-toggle="modal" data-bs-target="#loanModal" onClick={() => setStr("Offer")}>Crear</button>
										</span> : <></>
								}
							</div>
							{
								loans.loanOffers.length > 0 ? loans.loanOffers.map((x) => <LoanCard info={x} type="Offer"></LoanCard>) : <p className='text-muted'>No hay ofertas actualmente...</p>
							}
						</div>
						<div className='col'>
							<div className='row d-flex justify-content-center'>
								<div className='h3 col-3'>Peticiones</div>
								{
									UserType === "Prestatario" ?
										<span className='col-1'>
											<button className='btn btn-secondary fw-semibold' data-bs-toggle="modal" data-bs-target="#loanModal" onClick={() => setStr("Request")}>Crear</button>
										</span> : <></>
								}
							</div>
							<ul>
								{
									loans.loanRequests.length > 0 ? loans.loanRequests.map((x) => <li><LoanCard info={x} type="Request"></LoanCard></li>) : <p className='text-muted'>No hay peticiones actualmente...</p>
								}
							</ul>
						</div>
					</div>
				</span>
				<LoanForm str={str} />
			</>
	);
}
export default Loans;