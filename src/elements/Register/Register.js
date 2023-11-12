import './Register.css';
import React from 'react';
import { useState } from 'react';
import { axiosRegister } from '../../services/authServices.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const handleRegister = async (e) => {
	e.preventDefault();
	let Usuario = {
		email: e.target.emailInput.value,
		nombreCompleto: e.target.fullNameInput.value,
		nombreUsuario: e.target.usernameInput.value,
		contrasenna: e.target.passwordInput.value,
		tipoUsuario: e.target.userType.value
	};
	let perfil = {
		dni: e.target.dniInput.value,
		historialCrediticio: e.target.creditHistory.value,
		extractoBancario: e.target.bankExtract.value,
		comprobanteDeIngreso: e.target.revenueProof.value,
		descripcionFinanciera: e.target.financialDesc.value
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
		<>
			<form onSubmit={(e) => handleRegister(e)}>
				<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header border-bottom border-secondary">
								<h1 class="modal-title fs-5" id="registerModalLabel">Registrarme</h1>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<div class="mb-3">
									<label for="emailInput" class="form-label">Correo electronico</label>
									<input type="email" class="form-control border border-secondary" placeholder='Correo electronico' id="emailInput" aria-describedby="emailHelp" />
									<div id="emailHelp" class="form-text fw-semibold">Tu correo nunca va a ser compartido con terceros.</div>
								</div>
								<div class="mb-3">
									<label for="fullNameInput" class="form-label">Nombre completo</label>
									<input type="text" class="form-control border border-secondary" placeholder='Nombre completo' id="fullNameInput" />
								</div>
								<div class="mb-3">
									<label for="usernameInput" class="form-label">Nombre de usuario</label>
									<input type="text" class="form-control border border-secondary" placeholder='Nombre de usuario' id="usernameInput" />
								</div>
								<div class="mb-3">
									<label for="passwordInput" class="form-label">Contraseña</label>
									<input type="password" class="form-control border border-secondary" placeholder='Contraseña' id="passwordInput" />
								</div>
								<div class="mb-3">
									<label for="dniInput" class="form-label">DNI</label>
									<input type="text" class="form-control border border-secondary" placeholder='DNI' id="dniInput" />
								</div>
								<label for="dniInput" class="form-label">Tipo de usuario</label>
								<select class="form-select border border-secondary" aria-label="Default select example" id='userType' onChange={(e) => setUserType(e.target.value)}>
									<option selected>Tipo de usuario</option>
									<option value="Prestatario">Prestatario</option>
									<option value="Prestamista">Prestamista</option>
								</select>
							</div>
							<div class="modal-footer border-top border-secondary">
								{userType === "Prestamista" ? <>
									<input type="hidden" className="form-control" id="creditHistory" value='x' />
									<input type="hidden" className="form-control" id="revenueProof" value='x' />
									<input type="hidden" className="form-control" id="financialDesc" value='x' />
									<input type="hidden" className="form-control" id="bankExtract" value='x' />
									<button type="submit" onClick={handleShow} data-bs-dismiss="modal" class={`btn btn-outline-success border border-2 border-success fw-semibold`}>Registrarme</button>
								</>
									:
									<button class="btn btn-outline-success border border-2 border-success fw-semibold" onClick={(e) => e.preventDefault()} data-bs-target="#optionalModal" data-bs-toggle="modal">Continuar</button>}
							</div>
						</div>
					</div>
				</div>
				{userType === "Prestamista" ? <></> :
					<div class="modal fade" id="optionalModal" aria-hidden="true" aria-labelledby="optionalModalLabel" tabindex="-1">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header border-bottom border-secondary">
									<h1 class="modal-title fs-5" id="optionalModalLabel">Necesitamos un poco mas de información...</h1>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<div className="mb-3">
										<label className="form-label">Historial Crediticio</label>
										<input type="text" className="form-control" id="creditHistory" placeholder='Historial Crediticio' />
									</div>
									<div className="mb-3">
										<label className="form-label">Comprobante de Ingreso</label>
										<input type="text" className="form-control" id="revenueProof" placeholder='Comprobante de ingreso' />
									</div>
									<div className="mb-3">
										<label className="form-label">Extracto Bancario</label>
										<input type="text" className="form-control" id="bankExtract" placeholder='Extracto Bancario' />
									</div>
									<div className="mb-3">
										<label className="form-label">Descripcion Financiera</label>
										<input type="text" className="form-control" id="financialDesc" placeholder='Descripcion financiera' />
									</div>
								</div>
								<div class="modal-footer border-top border-secondary">
									<button type="button" class="btn btn-outline-secondary border border-2 border-secondary fw-semibold" data-bs-target="#registerModal" onClick={(e) => e.preventDefault()} data-bs-toggle="modal">⬅ Volver</button>
									<button type="submit" onClick={handleShow} data-bs-dismiss="modal" class="btn btn-outline-success border border-2 border-success fw-semibold">Registrarme</button>
								</div>
							</div>
						</div>
					</div>
				}
			</form>
			<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className='border-bottom border-secondary'>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Revisa tu bandeja de entrada y confirma tu correo electronico!</Modal.Body>
        <Modal.Footer className='border-top border-secondary'>
          <Button variant="primary" onClick={handleClose} className='bg-transparent btn-outline-success border border-2 border-success fw-semibold'>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
		</>
	);
}

export default Register;