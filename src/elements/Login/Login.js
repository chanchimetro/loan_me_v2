import './Login.css';
import React, { useContext, useState } from 'react';
import { axiosLogin } from '../../services/authServices.js';
import { axiosRequestPwdRestore } from '../../services/userServices';
import { axiosGetUserInfo } from '../../services/userServices';
import { userContext } from '../../contexts/userContext';
import { Alert, Modal, Button, Form, Row } from 'react-bootstrap';


function Login({ show, setShow }) {
	const context = useContext(userContext);
	const [alertShow, setAlertShow] = useState(false);
	const [variant, setVariant] = useState(false);
	const [alertText, setAlertText] = useState("");
	const [pwdRestore, setHandlePwdRestore] = useState(false);
	const [showPwdRestore, setShowPwdRestore] = useState(false);

	const handleClose = () => setShow(false)

	const handleLogin = async (e) => {
		e.preventDefault();
		let Usuario = {
			nombreUsuario: e.target.username.value,
			contrasenna: e.target.password.value
		};

		if(pwdRestore === true) {
			if(Usuario.nombreUsuario.length === 0) return;
			handleClose();
			setHandlePwdRestore(false);
			setShowPwdRestore(true);
			await handleRequestRestorePwd(Usuario.nombreUsuario);
			return;
		}

		if (Usuario.contrasenna.length == 0) return;

		console.log(JSON.stringify({ Usuario }))
		try {
			let r = await axiosLogin({ Usuario });
			let u = await axiosGetUserInfo(r.data.sessionId);
			setVariant("success");
			setAlertText('Sesion Iniciada!')
			//setAlertShow(true)
			context.setUser(
				{
					Username: Usuario.nombreUsuario,
					SessionId: r.data.sessionId,
					UserType: u.data.Usuario.tipoUsuario,
					LoanProposals: u.data.loanProposals
				}
			);
		} catch (e) {
			console.log(e);
			setVariant("danger");
			setAlertText(e.response.data)
			setAlertShow(true);
		}
		setShow(false);
	}

	const handleRequestRestorePwd = async (nombreUsuario) => {
		await axiosRequestPwdRestore(nombreUsuario);
	}

	const handleClosePwdRestore = () => setShowPwdRestore(false);

	return (
		<>
			<Alert className='login-alert' show={alertShow} variant={variant} onClose={() => setAlertShow(false)} dismissible>
				{alertText}
			</Alert>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Form onSubmit={(e) => handleLogin(e)}>
					<Modal.Body>
						<Row className="mb-3">
							<Form.Group md="4">
								<Form.Label>Nombre de Usuario</Form.Label>
								<Form.Control
									required
									type="text"
									placeholder="Nombre de Usuario"
									id='username'
								/>
							</Form.Group>
						</Row>
						<Form.Group md="4">
							<Form.Label>Contrasena</Form.Label>
							<Form.Control
								type="password"
								placeholder="Contrasena"
								id='password'
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={() => setHandlePwdRestore(true)} type="submit">
							He olvidado mi contrasena
						</Button>
						<Button variant="success" type='submit'>
							Iniciar Sesion
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			<Modal show={showPwdRestore} onHide={handleClosePwdRestore} centered>
				<Modal.Header closeButton className='border-bottom border-secondary'>

					<Modal.Title></Modal.Title>

				</Modal.Header>
				<Modal.Body>Revisa tu bandeja de entrada!</Modal.Body>
				<Modal.Footer className='border-top border-secondary'>
				<Button variant="primary" onClick={handleClosePwdRestore} className='bg-transparent btn-outline-success border border-2 border-success fw-semibold'>
					OK
				</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Login;