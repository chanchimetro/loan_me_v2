import './Login.css';
import React, { useContext } from 'react';
import { axiosLogin } from '../../services/authServices.js';
import { userContext } from '../../contexts/userContext';

const handleLogin = async (e, context) => {
	e.preventDefault();
	let Usuario = {
		nombreusuario: e.target.username.value,
		contrasenna: e.target.password.value,
	};
	console.log(JSON.stringify({ Usuario }))
	try {
		let r = await axiosLogin({ Usuario });
		console.log(r);
		context.setUser(
			{
				Username: Usuario.nombreusuario,
				SessionId: r.data.sessionId
			}
		);
	} catch (e) {
		console.log(e);
	}
}

function Login() {
	const context = useContext(userContext);

	return (
		<div className="modal-content">
			<div className="modal-header">
				<h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
				<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<form onSubmit={(e) => handleLogin(e, context)}>
				<div className="modal-body">
					<div className="mb-3">
						<label className="form-label">Nombre de usuario</label>
						<input type="text" className="form-control" id="username" placeholder='Nombre de usuario' />
					</div>
					<div className="mb-3">
						<label className="form-label">Contraseña</label>
						<input type="password" className="form-control" id="password" placeholder='Contraseña' />
					</div>
				</div>
				<div className="modal-footer">
					<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Login</button>
				</div>
			</form>
		</div>
	);
}

export default Login;