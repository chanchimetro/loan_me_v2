import './Home.css';
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

function Home() {
	let user = useContext(userContext);
	let loans = useContext(loansContext);
	const [isLoading, setIsLoading] = useState(true);
	const [isLogged, setIsLogged] = useState(false);
	let UserType = user.user.UserType;
	const [str, setStr] = useState("");

	useEffect(() => {
		if (user.user.SessionId != "") {
			setIsLogged(true);
			setIsLoading(true)
			getLoansInfo(user.user.SessionId, setIsLoading, loans.setLoanOffers, loans.setLoanRequests);
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
						<p className='h1'>Bienvenido a Loan Me!</p>
						<hr></hr>
						{
							!isLogged ?
								<p className='fw-normal'>Inicia sesión para ver los prestamos disponibles o crear los tuyos!</p> :
								<>
									<div className='col'>
										<div className='row d-flex justify-content-center'>
											<div className='h3 mb-3 col-3'>Ofertas</div>
											{
												UserType === "Prestamista" ?
													<span className='col-1'>
														<button className='btn btn-secondary fw-semibold' data-bs-toggle="modal" data-bs-target="#loanModal" onClick={() => setStr("Offer")}>Crear</button>
													</span> : <></>
											}
										</div>
										<ul className='loan-ul'>
											{
												loans.loanOffers.length > 0 ? loans.loanOffers.map((x) => <li className='loan-li'><LoanCard info={x} type="Offer"></LoanCard></li>) : <p className='text-muted'>No hay ofertas actualmente...</p>
											}
										</ul>
									</div>
									<div className='col'>
										<div className='row d-flex justify-content-center'>
											<div className='h3 mb-3 col-3'>Peticiones</div>
											{
												UserType === "Prestatario" ?
													<span className='col-1'>
														<button className='btn btn-secondary fw-semibold' data-bs-toggle="modal" data-bs-target="#loanModal" onClick={() => setStr("Request")}>Crear</button>
													</span> : <></>
											}
										</div>
										<ul className='loan-ul'>
											{
												loans.loanRequests.length > 0 ? loans.loanRequests.map((x) => <li className='loan-li'><LoanCard info={x} type="Request"></LoanCard></li>) : <p className='text-muted'>No hay peticiones actualmente...</p>
											}
										</ul>
									</div>
									<LoanForm str={str} />
								</>
						}
					</div>
				</span>
			</>
	);
}
export default Home;