import './Login.css';
import React, { useContext } from 'react';
import { axiosLogin } from '../../services/authServices.js';
import { axiosGetUserInfo } from '../../services/userServices';
import { userContext } from '../../contexts/userContext';

const handleLogin = async (e, context) => {
	e.preventDefault();
	let Usuario = {
		nombreUsuario: e.target.username.value,
		contrasenna: e.target.password.value
	};
	console.log(JSON.stringify({ Usuario }))
	try {
		let r = await axiosLogin({ Usuario });
		let u = await axiosGetUserInfo(r.data.sessionId);
		console.log(r);
		console.log(u);
		context.setUser(
			{
				Username: Usuario.nombreUsuario,
				SessionId: r.data.sessionId,
				UserType: u.data.Usuario.tipoUsuario
			}
		);
	} catch (e) {
		console.log(e);
	}
}

function Login() {
	const context = useContext(userContext);

	return (
		<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header border-bottom border-secondary">
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
						<div className="modal-footer border-top border-secondary">
							<button type="submit" className="btn btn-outline-success border border-2 border-success fw-semibold" data-bs-dismiss="modal">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;