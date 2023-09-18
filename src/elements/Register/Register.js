import './Register.css';
import React from 'react';
import { useState } from 'react';
import { axiosRegister } from '../../services/authServices.js';

/*
	"Usuario": {
		"email": "anyemail@mail.com",
		"nombrecompleto": "realname",
		"nombreusuario": "username",
		"contrasenna": "password",
		"idwallet": "optional wallet",
		"tipousuario": "userType - Prestatario, Prestamista or Administrador"
	},
	"perfil": {
		"dni": "x",
		"historialcrediticio": "x",
		"comprobantedeingreso": "x",
		"descripcionfinanciera": "x"
	}
*/

const handleRegister = async (e) => {
	e.preventDefault();

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
							<select className="form-select" id='userType' aria-label="Register select">
								<option selected>Tipo de usuario</option>
								<option value="Prestatario" onClick={() => setUserType("Prestatario")}>Prestatario</option>
								<option value="Prestamista" onClick={() => setUserType("Prestamista")}>Prestamista</option>
							</select>
						</div>
						{
							userType === "Prestamista" ?
								<>
									<div className="mb-3">
										<label className="form-label">Historial Crediticio</label>
										<input type="text" className="form-control" id="creditHistory" placeholder='Historial Crediticio' />
									</div>
									<div className="mb-3">
										<label className="form-label">Comprobante de Ingreso</label>
										<input type="text" className="form-control" id="revenueProof" placeholder='Comprobante de ingreso' />
									</div>
									<div className="mb-3">
										<label className="form-label">Descripcion Financiera</label>
										<input type="text" className="form-control" id="financialDesc" placeholder='Descripcion financiera' />
									</div>
								</>
								:
								<>
									<input type="hidden" className="form-control" id="creditHistory" value='x' />
									<input type="hidden" className="form-control" id="revenueProof" value='x' />
									<input type="hidden" className="form-control" id="financialDesc" value='x' />
								</>
						}
					</div>
					<div className="modal-footer">
						<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Register</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;