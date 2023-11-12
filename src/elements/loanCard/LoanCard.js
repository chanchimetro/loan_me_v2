import './LoanCard.css'
import React from "react";
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

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

export default function LoanCard({ info, type }) {
	return (
		<Link to={`/loan/${info.loan.id}/${type}`}>
			<Card body className='card'>
				<Container>
					<Row>
						<Col>
							<div className='loantitle'>
								<p>Monto del préstamo</p>
								<h1>$ {info.loan.monto}</h1>
							</div>
						</Col>
						<Col>
							<div className=''>
								<p>Moneda</p>
								<h5>{info.loan.walletChain}</h5>
							</div>
						</Col>
					</Row>
					<hr className='hr' />
					<Row>
						<Col>
							<p>Plazo de pago</p>
							<h5>{info.loan.intervaloPago}</h5>
						</Col>
						<Col>
							<p>Fecha a pagar</p>
							<h5>{info.loan.plazoPago}</h5>
						</Col>
						<Col>
							<p>Interés</p>
							<h5>{info.loan.interes}%</h5>
						</Col>
					</Row>
				</Container>
			</Card>
		</Link >
	);
}