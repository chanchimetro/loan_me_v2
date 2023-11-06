import React, { useContext, useState } from "react";
import { userContext } from "../../contexts/userContext";
import { axiosPostLoanOffer, axiosPostLoanRequest } from "../../services/loanServices";

const handleSubmit = (e, str, SessionId, intervaloPago) => {
	let now = new Date();
	e.preventDefault();
	let wallet = "";
	if (str === "Request") wallet = e.target.walletId.value;
	console.log(wallet)
	let Loan = {
		monto: e.target.monto.value,
		interes: e.target.interes.value,
		plazoPago: e.target.plazoPago.value + " " + now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds(),
		intervaloPago: intervaloPago,
		riesgo: 1,
		walletId: wallet,
		walletChain: "Bitcoin"
	}
	if (str === "Offer") {
		axiosPostLoanOffer(SessionId, Loan);
	} else if (str === "Request") {
		axiosPostLoanRequest(SessionId, Loan);
	}
}

export default function LoanForm({ str }) {
	let context = useContext(userContext);
	const [intervaloPago, setIntervaloPago] = useState("");

	return (
		<div class="modal fade" id="loanModal" tabindex="-1" aria-labelledby="loanModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<form onSubmit={(e) => handleSubmit(e, str, context.user.SessionId, intervaloPago)}>
						<div class="modal-body">
							<div class="mb-3">
								<label for="" class="form-label">Monto</label>
								<div class="input-group">
									<span class="input-group-text fw-semibold" id="monto-addon">$</span>
									<input type="number" class="form-control" placeholder="0000" aria-label="Monto" name="monto" id="monto" aria-describedby="monto-addon" />
								</div>
							</div>
							<div class="mb-3">
								<label for="" class="form-label">Interes</label>
								<div class="input-group">
									<span class="input-group-text fw-semibold" id="interes-addon">%</span>
									<input type="number" class="form-control" placeholder="0" aria-label="Interes" id="interes" aria-describedby="interes-addon" />
								</div>
							</div>
							<div class="mb-3">
								<label for="" class="form-label">Plazo de pago</label>
								<input type="date" class="form-control" id="plazoPago" />
							</div>
							{
								str === "Request" ?
									<div class="mb-3">
										<label for="" class="form-label">Wallet ID</label>
										<input type="text" placeholder="Wallet ID" class="form-control" id="walletId" />
									</div>
									: <></>
							}
							<label for="" class="form-label">Intervalo de pagos</label>
							<select class="form-select mb-3" onChange={(e) => setIntervaloPago(e.target.value)} aria-label="Default select example">
								<option selected>Seleccione el intervalo</option>
								<option value="1 por semana">1/semana</option>
								<option value="2 por semana">2/semana</option>
								<option value="1 por mes">1/mes</option>
							</select>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-outline-success border border-2 border-success fw-semibold" data-bs-dismiss="modal">Crear</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}