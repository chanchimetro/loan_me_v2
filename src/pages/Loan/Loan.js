import './Loan.css';
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosGetLoanById, axiosProposeCompleteLoan } from '../../services/loanServices';
import { axiosGetUserInfo } from '../../services/userServices';
import { userContext } from '../../contexts/userContext';
import ProposalLi from '../../elements/Proposal-li/ProposalLi';
import { Button, Card, Col, Container, Row, Modal, ListGroup } from 'react-bootstrap';


function Loan() {
	let context = useContext(userContext);
	const { id, type } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [info, setInfo] = useState({});
	const [show, setShow] = useState(false);
	const [showAccept, setShowAccept] = useState(true);
	const [showProposals, setShowProposals] = useState(false)
	const [loanProposals, setLoanProposals] = useState([]);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAccept = async (e, sessionId, loanId, idwallet) => {
		e.preventDefault();
		let r = axiosProposeCompleteLoan(sessionId, loanId, idwallet)
		handleClose();
	}

	const getLoanInfo = async (SessionId, setIsLoading, setInfo) => {
		console.log(type);
		try {
			let r = await axiosGetLoanById(id, SessionId);
			await setInfo(r.data);
			setIsLoading(false);
			if (r.data.prestatario?.nombreUsuario === context.user.Username || r.data.prestamista?.nombreUsuario === context.user.Username) {
				setShowAccept(false);
				setShowProposals(true);
				await setLoanProposals(context.user.LoanProposals);
			}
			if (r.data.prestatario && r.data.prestamista) {
				setShowAccept(false);
				setShowProposals(false);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getLoanInfo(context.user.SessionId, setIsLoading, setInfo);
	}, [])

	return (
		isLoading ? <></> : <>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<form onSubmit={(e) => handleAccept(e, context.user.SessionId, info.loan.id, e.target.idwallet.value)}>
					<Modal.Body>
						<div class="mb-3">
							<label for="" class="form-label">Wallet ID</label>
							<input type="text" class="form-control" id="idwallet" />
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="success" type='submit'>
							Confirmar
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
			<Container className='loanCard'>
				<Row>
					<Col>
						<Card body>
							<Container>
								<Row>
									<Col>
										<div className='loantitle'>
											<p>Monto del préstamo</p>
											<h1>$ {info.loan.monto}</h1>
										</div>
									</Col>
									<Col>
										<div className=''>
											<p>Moneda</p>
											<h5>{info.loan.walletChain}</h5>
										</div>
									</Col>
								</Row>
								<hr className='hr' />
								<Row>
									<Col>
										<p>Plazo de pago</p>
										<h5>{info.loan.intervaloPago}</h5>
									</Col>
									<Col>
										<p>Fecha a pagar</p>
										<h5>{info.loan.plazoPago}</h5>
									</Col>
									<Col>
										<p>Interés</p>
										<h5>{info.loan.interes}%</h5>
									</Col>
								</Row>
								{
									showAccept ?
										<>
											<hr></hr>
											<Row>
												<Col xs={6}>
													<Button variant="success" onClick={handleShow}>
														Aceptar
													</Button>
												</Col>
												: <></>
											</Row>
										</> : <></>
								}
							</Container>
						</Card>
					</Col>
					{
						!showProposals ? <></> :
							<Col xs={4}>
								<Card body>
									<h4>Propuestas:</h4>
									<ListGroup className='proposals-list'>
										{loanProposals.map((p) => (p.LoanId === parseInt(id)) ? <ProposalLi data={p} /> : <></>)}
									</ListGroup>
								</Card>
							</Col>
					}
				</Row>
			</Container>
		</>
	);
}
export default Loan;