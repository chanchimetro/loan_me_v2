import React, { useContext, useEffect, useState } from "react";
import { axiosGetUserInfo } from "../../services/userServices";
import { userContext } from "../../contexts/userContext";
import { Col, Container, Row } from "react-bootstrap";
import MyLoanCard from "../../elements/myLoanCard/MyLoanCard";

function MyLoans() {
	const context = useContext(userContext)
	const [loans, setLoans] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const func = async () => {
			let r = await axiosGetUserInfo(context.user.SessionId)
			console.log("r.data.loans");
			console.log(r.data);
			await setLoans(r.data);
			setLoading(false);
		}
		func();
	}, [])

	return (
		loading ? <></> :
			<Container fluid>
				<Row>
					<div className='row col text-center my-3'>
						<p className='h1'>Mis Prestamos</p>
					</div>
				</Row>
				<Row>
					<Col>
						<ul className='loan-ul'>
							{
								loans.loans.length > 0 ? loans.loans.map((x) => <li className='loan-li'><MyLoanCard info={x} type="Offer" /></li>) : <p className='text-muted'>No hay prestamos actualmente...</p>
							}
						</ul>
					</Col>
				</Row>
			</Container>
	);
}

export default MyLoans;