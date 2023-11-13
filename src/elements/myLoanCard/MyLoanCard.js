import './myLoanCard.css'
import React from "react";
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function MyLoanCard({ info, type }) {
	return (
		<Link to={`/loan/${info.id}/${type}`}>
			<Card body className='card'>
				<Container>
					<Row>
						<Col>
							<div className='loantitle'>
								<p>Monto del préstamo</p>
								<h1>$ {info.monto}</h1>
							</div>
						</Col>
						<Col>
							<div className=''>
								<p>Moneda</p>
								<h5>{info.walletChain}</h5>
							</div>
						</Col>
					</Row>
					<hr className='hr' />
					<Row>
						<Col>
							<p>Plazo de pago</p>
							<h5>{info.intervaloPago}</h5>
						</Col>
						<Col>
							<p>Fecha a pagar</p>
							<h5>{info.plazoPago}</h5>
						</Col>
						<Col>
							<p>Interés</p>
							<h5>{info.interes}%</h5>
						</Col>
					</Row>
				</Container>
			</Card>
		</Link >
	);
}