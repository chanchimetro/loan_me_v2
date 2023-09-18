import React, { useContext } from 'react';
import { axiosChangePwd } from "../../services/userServices.js";
import { userContext } from '../../contexts/userContext';

const handleChangePwd = async(e, context) => {
	e.preventDefault();
	let data = {
		Usuario: {
			"nombreusuario": context.user.Username,
			"contrasenna": e.target.currentPass.value
		},
		newPwd: e.target.newPass.value
	};
	try
	{
		let r = await axiosChangePwd(data, context.user.SessionId);
		console.log(r);
	} catch(e) {
		console.log(e);
	};
}

function ChangePwd() {
	let context = useContext(userContext);

	return (
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="changePwdModalLabel">Cambiar contraseña</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<form onSubmit={(e) => handleChangePwd(e, context)}>
				<div class="modal-body">
					<div className="mb-3">
						<label className="form-label">Contraseña actual</label>
						<input required type="password" className="form-control" id="currentPass" placeholder='Contraseña actual' aria-describedby="passHelp" />
						<div id="passHelp" class="form-text">Si no te acordas tu contraseña podes recuperarla en la pagina de login.</div>
					</div>
					<div className="mb-3">
						<label className="form-label">Contraseña nueva</label>
						<input required type="password" className="form-control" id="newPass" placeholder='Contraseña nueva' />
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Confirmar</button>
				</div>
			</form>
		</div>
	);
}
export default ChangePwd;