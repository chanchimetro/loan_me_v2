import "./Layout.css";
import React, { useContext } from 'react';
import logo from '../../assets/LoanMe.svg';
import { Outlet, Link } from "react-router-dom";
import Login from "../../elements/Login/Login.js"
import Register from '../../elements/Register/Register';
import { userContext } from '../../contexts/userContext';
import { axiosLogout } from '../../services/authServices';

const handleLogout = async (context) => {
	let r = await axiosLogout(context.user.SessionId);
	console.log(r);
	context.setUser({
		Username: "",
		SessionId: ""
	})
}

function Layout() {
	let context = useContext(userContext);
	
	return (
		<>
		<Login />
		<Register />
			<nav class="navbar navbar-expand-lg">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						<img src={logo} alt="LoanMe" width="30" height="50" className='' />
					</a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className='nav-link active' to="/">Home</Link>
							</li>
						</ul>
						<div className='d-flex'>
							{
								context.user.Username === "" ? <>
									<button type="button" className="btn btn-link text-decoration-none text-dark border border-dark mx-3 auth-btn" data-bs-toggle="modal" data-bs-target="#loginModal">
										Login
									</button>
									<button type="button" className="btn btn-link text-decoration-none text-dark border border-dark auth-btn" data-bs-toggle="modal" data-bs-target="#registerModal">
										Register
									</button>
								</> :
									<div className="dropstart mx-3">
										<button type="button" className="btn btn-link text-decoration-none text-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
											{context.user.Username}
										</button>
										<ul className="dropdown-menu">
											<li><Link className="dropdown-item" to="/profile">Mi perfil</Link></li>
											<hr />
											<li><Link to={"/"} className="dropdown-item" onClick={() => handleLogout(context)}>Cerrar sesión</Link></li>
										</ul>
									</div>
							}
						</div>
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	);
}
export default Layout;