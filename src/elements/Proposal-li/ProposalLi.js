import './ProposalLi.css';
import React, { useContext } from "react";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import { userContext } from '../../contexts/userContext';
import { axiosCompleteLoan } from '../../services/loanServices';

export default function ProposalLi({ data }) {
	const context = useContext(userContext);

	const handleCompleteLoan = () => {
		let r = axiosCompleteLoan(context.user.SessionId, data.LoanId, data.User.id);
	}

	return (
		<ListGroup.Item>
			<Container fluid>
				<Col xs={6}>
					<Row>
						{data.User.nombreUsuario}
					</Row>
					<Row className='userEmail'>
						{data.User.email}
					</Row>
				</Col>
				<Col xs={2}>
					<Button onClick={() => handleCompleteLoan()}>Ok</Button>
				</Col>
			</Container>
		</ListGroup.Item>
	);
}