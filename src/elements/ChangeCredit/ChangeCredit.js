import React, { useContext } from 'react';
import { userContext } from '../../contexts/userContext';
import { axiosChangeCredit } from '../../services/userServices';

const handleChangeCredit = async (e, context) => {
	e.preventDefault();
	let data = {
		Usuario: {
			nombreUsuario: context.user.Username,
			contrasenna: ""
		},
		perfil: {
			historialcrediticio: e.target.creditHist.value,
			extractobancario: e.target.bankExtract.value,
			comprobantedeingreso: e.target.revenueProof.value,
			descripcionfinanciera: e.target.financialDesc.value
		}
	};
	try{
		let r = await axiosChangeCredit(data, context.user.SessionId);
		console.log(r);
	} catch(e) {
		console.log(e);
	}
}

function ChangeCredit() {
	let context = useContext(userContext);

	return (
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="changeCreditModalLabel">Cambiar perfil crediticio</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<form onSubmit={(e) => handleChangeCredit(e, context)}>
				<div class="modal-body">
					<div className="mb-3">
						<label className="form-label">Historial crediticio</label>
						<input type="text" className="form-control" id="creditHist" placeholder='Historial crediticio' />
					</div>
					<div className="mb-3">
						<label className="form-label">Comprobante de ingreso</label>
						<input type="text" className="form-control" id="revenueProof" placeholder='Comprobante de ingreso' />
					</div>
					<div className="mb-3">
						<label className="form-label">Extracto bancario</label>
						<input type="text" className="form-control" id="bankExtract" placeholder='Extracto bancario' />
					</div>
					<div className="mb-3">
						<label className="form-label">Descripcion financiera</label>
						<input type="text" className="form-control" id="financialDesc" placeholder='Descripcion financiera' />
					</div>
					<div className='text-muted fs-6'>Los campos que no se desean modificar deben dejarse vacios.</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Confirmar</button>
				</div>
			</form>
		</div>
	);
}
export default ChangeCredit;