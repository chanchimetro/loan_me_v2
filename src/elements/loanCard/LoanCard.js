import './LoanCard.css'

import React from "react";

/*
{
						"id": 0,
						"monto": 2521412,
						"fechaCreacion": "no se bien el formato",
						"interes": 22.5,
						"plazoPago": "no se bien el formato x2",
						"intervaloPago": "String. formato a cambiar?",
						"riesgo": 50
				}
*/

export default function LoanCard({ info }) {
	return (
		<div class="card text-start">
			<div class="card-header fw-semibold ">
				{info.loan.fechaCreacion}
			</div>
			<div class="card-body">
				<h5 class="card-title">$ {info.loan.monto} + {info.loan.interes}%</h5>
				<ul className='list-group list-group-flush rounded'>
					<li class="list-group-item card-text border-bottom border-secondary">Plazo: {info.loan.plazoPago}</li>
					<li class="list-group-item card-text border-bottom border-secondary">Intervalo: {info.loan.intervaloPago}</li>
					<li class="list-group-item card-text">Riesgo: {info.loan.riesgo}</li>
				</ul>
			</div>
		</div>
	);
}