import './ValidateUser.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosValidateUser } from '../../services/authServices';

const validate = () => {
	const urlParams = new URLSearchParams(window.location.search);
	let token = urlParams.get('token');
	let r = axiosValidateUser(token);
}

function ValidateUser() {
	return (
		<>
			<span className='container-fluid title d-flex w-75 rounded mx-auto mt-5 p-3' onLoad={validate()}>
				<div className='row col text-center'>
					<p><b>Tu usuario fue validado!</b></p> :
					<>
						<Link to='/loans'>Pagina principal</Link>
					</>
				</div>
			</span>
		</>
	);
}
export default ValidateUser;