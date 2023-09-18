import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BorrowerForm() {
	return (
		<>
				<Modal.Header closeButton>
					<Modal.Title>Necesitamos un poco más de informacion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
				</Modal.Body>
				<Modal.Footer>
					<button class="btn btn-secondary" data-bs-target="#loginModal" data-bs-toggle="modal">Volver</button>
					<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Register</button>
				</Modal.Footer>
		</>
	);
}

export default BorrowerForm;