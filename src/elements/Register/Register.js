import './Register.css';
import React from 'react';
import { useState } from 'react';
import { axiosRegister } from '../../services/authServices.js';
import BorrowerForm from '../borrowerForm/borrowerForm.js';
import Modal from 'react-bootstrap/Modal';

const handleRegister = async (e) => {
	e.preventDefault();

	console.log("BIGLULZ", e);

	let Usuario = {
		email: e.target.email.value,
		nombrecompleto: e.target.fullname.value,
		nombreusuario: e.target.username.value,
		contrasenna: e.target.password.value,
		idwallet: e.target.wallet.value,
		tipousuario: e.target.userType.value
	};
	let perfil = {
		dni: e.target.DNI.value,
		historialcrediticio: e.target.creditHistory.value,
		extractobancario: e.target.bankExtract.value,
		comprobantedeingreso: e.target.revenueProof.value,
		descripcionfinanciera: e.target.financialDesc.value
	};
	try {
		let r = await axiosRegister({ Usuario, perfil });
		console.clear();
		console.log(r);
	} catch (e) {
		console.log(e);
	}
}

function Register() {
	const [userType, setUserType] = useState();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
			<div className="modal-content">
				<div className="modal-header">
					<h1 className="modal-title fs-5" id="authModalLabel">Register</h1>
					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<form onSubmit={(e) => handleRegister(e)}>
					<div className="modal-body">
						<div className="mb-3">
							<label className="form-label">E-mail</label>
							<input type="email" className="form-control" id="email" placeholder='E-mail' />
						</div>
						<div className="mb-3">
							<label className="form-label">Nombre completo</label>
							<input type="text" className="form-control" id="fullname" placeholder='Nombre completo' />
						</div>
						<div className="mb-3">
							<label className="form-label">Nombre de usuario</label>
							<input type="text" className="form-control" id="username" placeholder='Nombre de usuario' />
						</div>
						<div className="mb-3">
							<label className="form-label">Contraseña</label>
							<input type="password" className="form-control" id="password" placeholder='Contraseña' />
						</div>
						<div className="mb-3">
							<label className="form-label">Wallet</label>
							<input type="text" className="form-control" id="wallet" placeholder='Wallet' />
						</div>
						<div className="mb-3">
							<label className="form-label">DNI</label>
							<input type="text" className="form-control" id="DNI" placeholder='N° de DNI' />
						</div>
						<div className="mb-1">
							<label className="form-label">Tipo de usuario</label>
							<select className="form-select" id='userType' onChange={e => setUserType(e.target.value)} aria-label="Register select">
								<option selected>Tipo de usuario</option>
								<option value="Prestatario">Prestatario</option>
								<option value="Prestamista">Prestamista</option>
							</select>
						</div>
					</div>
					<div className="modal-footer">
						{
							userType === "Prestamista" ? <button class="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { handleShow(); e.preventDefault(); }}>Continuar</button>
								:
								<>
									<input type="hidden" className="form-control" id="creditHistory" value='x' />
									<input type="hidden" className="form-control" id="revenueProof" value='x' />
									<input type="hidden" className="form-control" id="financialDesc" value='x' />
									<input type="hidden" className="form-control" id="bankExtract" value='x' />
									<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Register</button>
								</>
						}
					</div>
					<Modal show={show} onHide={handleClose}>
						<BorrowerForm></BorrowerForm>
					</Modal>
				</form>
			</div>
		</div>
	);
}

export default Register;