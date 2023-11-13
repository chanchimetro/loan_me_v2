import './Loan.css';
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosAddTxn, axiosGetLoanById, axiosProposeCompleteLoan } from '../../services/loanServices';
import { userContext } from '../../contexts/userContext';
import ProposalLi from '../../elements/Proposal-li/ProposalLi';
import { Button, Card, Col, Container, Row, Modal, ListGroup } from 'react-bootstrap';


function Loan() {
	let context = useContext(userContext);
	const { id, type } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [info, setInfo] = useState({});
	const [txns, setTxns] = useState([]);
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const [showAccept, setShowAccept] = useState(true);
	const [showProposals, setShowProposals] = useState(false);
	const [showAddTxns, setShowAddTxns] = useState(false);
	const [myLoan, setMyLoan] = useState(false);
	const [loanProposals, setLoanProposals] = useState([]);
	const handleClose = () => setShow(false);
	const handleClose2 = () => setShow2(false);
	const handleShow = () => setShow(true);

	const handleAccept = async (e, sessionId, loanId, idwallet) => {
		e.preventDefault();
		let r = axiosProposeCompleteLoan(sessionId, loanId, idwallet)
		handleClose();
	}

	const handleTxn = async (e, sessionId, loanId, txnId) => {
		e.preventDefault();
		let r = axiosAddTxn(sessionId, loanId, txnId)
		handleClose();
	}

	const getLoanInfo = async (SessionId, setIsLoading, setInfo) => {
		console.log(type);
		try {
			let r = await axiosGetLoanById(id, SessionId);
			await setInfo(r.data);
			console.log(info);
			setIsLoading(false);
			if (r.data.prestatario?.nombreUsuario === context.user.Username || r.data.prestamista?.nombreUsuario === context.user.Username) {
				setShowAccept(false);
				setShowProposals(true);
				setMyLoan(true);
				await setLoanProposals(context.user.LoanProposals);
			}
			if (r.data.prestatario != null && r.data.prestamista != null) {
				setShowAccept(false);
				setShowProposals(false);
				setShowAddTxns(true);
			}

			console.log("response", r);
			console.log("kek", r.data.txns.length);
			setTxns(r.data.txns);
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		console.log("txns", txns);
	}, [txns])

	useEffect(() => {
		getLoanInfo(context.user.SessionId, setIsLoading, setInfo);
	}, [])

	return (
		isLoading ? <></> : <>
			<Modal show={show2} onHide={handleClose2}>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<form onSubmit={(e) => handleTxn(e, context.user.SessionId, info.loan.id, e.target.txnId.value)}>
					<Modal.Body>
						<div class="mb-3">
							<label for="" class="form-label">Txn ID</label>
							<input type="text" class="form-control" id="txnId" />
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose2}>
							Close
						</Button>
						<Button variant="success" type='submit'>
							Confirmar
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
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
											</Row>
										</> : <></>
								}
							</Container>
						</Card>
						{
							myLoan ?
								<Card body className='mt-3'>
									<Container style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
										<Row style={{justifyContent: "space-around"}}>
											<Col>
												<div className='loantitle'>
													<p>Wallet Id</p>
													<h5>{info.loan.walletId}</h5>
												</div>
											</Col>
											<Col>
												<div className=''>
													<p>WalletId de retorno</p>
													<h5>{info.loan.returnWalletId}</h5>
												</div>
											</Col>
										</Row>
										{
											showAddTxns ?

											context.user.UserType === "Prestamista" ?
												(txns.length === 0 ? <Row><Button onClick={()=>setShow2(true)} variant='success' className='mt-3'>Agregar Transaccion</Button></Row> : <></>)
												:
												(txns.length === 0 ? <></> : <Row><Button onClick={()=>setShow2(true)} variant='success' className='mt-3'>Agregar Transaccion</Button></Row>)

											:

											<></>
										}
										<Container style={{display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "2%"}}>
										{
											txns.map((txn, idx) => (<div>Txn {idx}: {txn.txnId}</div>))
										}
										</Container>
									</Container>
								</Card> : <></>
						}
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