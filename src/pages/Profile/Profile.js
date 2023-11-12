import './Profile.css'
import React, { useContext, useEffect, useState } from 'react';
import { axiosGetUserInfo } from '../../services/userServices.js';
import { userContext } from '../../contexts/userContext.js';
import pfp from "../../assets/profilepic.jpg";
import ChangePwd from '../../elements/ChangePwd/ChangePwd.js';
import ChangeCredit from '../../elements/ChangeCredit/ChangeCredit.js';

const getUserInfo = async (SessionId, setLoading, setUserInfo) => {
	try {
		let r = await axiosGetUserInfo(SessionId);
		console.log(r);
		setUserInfo(r.data);
		setLoading(false);
	} catch (e) {
		console.log(e);
	}
}

function Profile() {
	let context = useContext(userContext);
	const [userInfo, setUserInfo] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUserInfo(context.user.SessionId, setLoading, setUserInfo)
	}, [])

	return (
		loading ?
			<div className='text-center'>Loading...</div> :
			<div className='d-flex align-items-center'>
				<div className='container row rounded mx-auto mt-5 px-3 pt-5'>
					<div className='col text-center'>
						<img src={pfp} class="img-thumbnail img-fluid h-50 shadow " alt="Profile picture" />
						<div className='mt-2 fw-bold fs-5'>{userInfo.Usuario.nombreCompleto}</div>
						<div className='mb-2 fw-semibold fs-6'>{userInfo.Usuario.tipoUsuario}</div>
						<ul class="list-group w-75 mx-auto">
							<li class="list-group-item">
								<div className='float-start fw-bold col-2'>Username:</div>
								<div className='col'>{userInfo.Usuario.nombreUsuario}</div>
							</li>
							<li class="list-group-item">
								<div className='float-start fw-bold col-2'>E-mail:</div>
								<div className='col'>{userInfo.Usuario.email}</div>
							</li>
							<button type="button" class="list-group-item bg-secondary-subtle list-group-item-action" data-bs-toggle="modal" data-bs-target="#changePwdModal">Cambiar contraseña</button>
						</ul>
					</div>
					{
						userInfo.Usuario.tipoUsuario === "Prestamista" ? <></>:
							<div className='col text-center d-flex align-items-center'>
								<ul class="list-group w-75 mx-auto">
									<li class="list-group-item">
										<div className='float-start fw-bold col-4'>Historial crediticio:</div>
										<div className='col'>{userInfo.perfil.historialCrediticio}</div>
									</li>
									<li class="list-group-item">
										<div className='float-start fw-bold col-4'>Comprobante ingreso:</div>
										<div className='col'>{userInfo.perfil.comprobanteDeIngreso}</div>
									</li>
									<li class="list-group-item">
										<div className='float-start fw-bold col-4'>Desc. financiera:</div>
										<div className='col'>{userInfo.perfil.descripcionFinanciera}</div>
									</li>
									<li class="list-group-item">
										<div className='float-start fw-bold col-4'>Extracto bancario:</div>
										<div className='col'>{userInfo.perfil.extractoBancario}</div>
									</li>
									<button type="button" class="list-group-item bg-secondary-subtle list-group-item-action" data-bs-toggle="modal" data-bs-target="#changeCreditModal">Cambiar información financiera</button>
								</ul>
							</div>
					}
				</div >
				<div class="modal fade" id="changePwdModal" tabindex="-1" aria-labelledby="changePwdModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<ChangePwd />
					</div>
				</div>
				<div class="modal fade" id="changeCreditModal" tabindex="-1" aria-labelledby="changeCreditModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<ChangeCredit />
					</div>
				</div>
			</div>
	);
}
export default Profile;

