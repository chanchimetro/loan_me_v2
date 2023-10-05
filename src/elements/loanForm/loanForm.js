import React from "react";

/*
{
	"Loan": {
		"monto": 1241242,
		"interes": 5.5,
		"plazoPago": "YYYY-MM-DD H:M:S",
		"intervaloPago": "String. formato a cambiar?",
		"riesgo": 20
	}
}
*/

export default function loanForm() {
	return (
		<div class="modal fade" id="loanModal" tabindex="-1" aria-labelledby="loanModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<form>
						<div class="modal-body">
							<div class="mb-3">
								<label for="exampleInputPassword1" class="form-label">Monto</label>
								<input type="number" class="form-control" id="monto"/>
							</div>
							<div class="mb-3">
								<label for="exampleInputPassword1" class="form-label">Interes</label>
								<input type="number" class="form-control" id="interes"/>
							</div>
							<div class="mb-3">
								<label for="exampleInputPassword1" class="form-label">Plazo de pago</label>
								<input type="number" class="form-control" id="plazoPago"/>
							</div>
							<div class="mb-3">
								<label for="exampleInputPassword1" class="form-label">Intervalo por pago</label>
								<input type="number" class="form-control" id="intervaloPago"/>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary">Save changes</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}