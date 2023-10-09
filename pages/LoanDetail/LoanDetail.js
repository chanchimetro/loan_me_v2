import { loansContext } from '../../contexts/loansContext';
import React, { useContext, useEffect, useState } from 'react';
import { axiosGetLoanById } from '../../services/loanServices.js';
import { userContext } from '../../contexts/userContext.js';
import pfp from "../../assets/profilepic.jpg";

const getLoanById = async (SessionId, setLoading, setLoanInfo, loanId) => {
    try {
        let r = await axiosGetLoanById(SessionId, loanId);
        console.log(r);
        setLoanInfo(r.data);
        setLoading(false);
    } catch (e) {
        console.log(e);
    }
}

   
function LoanDetail(loanId){
    let context = useContext(userContext);
    const [loanInfo, setLoanInfo] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLoanById(context.user.SessionId, setLoading, setLoanInfo, loanId)
        }, [])
    

    return(
        <>
            {
                loading ? <div className='text-center'>Loading...</div>  : 
                <div>
                    <div className='col text-center'>
                        <img src={pfp} class="img-thumbnail img-fluid h-50 shadow " alt="Profile picture" />
                        <div className='mt-2 fw-bold fs-5'>{loanInfo.user.nombreCompleto}</div>
                        <div className='mb-2 fw-semibold fs-6'>{loanInfo.user.tipoUsuario}</div>
                        <ul class="list-group w-75 mx-auto">
                            <li class="list-group-item">
                                <div className='float-start fw-bold col-2'>Username:</div>
                                <div className='col'>{loanInfo.user.nombreUsuario}</div>
                            </li>
                        </ul>
                    </div>
                    <div className='col text-center d-flex align-items-center'>
                        <ul class="list-group w-75 mx-auto">
                            <li class="list-group-item">
                                <div className='float-start fw-bold col-4'>Monto:</div>
                                <div className='col'>{loanInfo.loan.monto}</div>
                            </li>
                            <li class="list-group-item">
                                <div className='float-start fw-bold col-4'>Interes:</div>
                                <div className='col'>{loanInfo.loan.interes}</div>
                            </li>
                            <li class="list-group-item">
                                <div className='float-start fw-bold col-4'>Plazo de Pago:</div>
                                <div className='col'>{loanInfo.loan.plazoPago}</div>
                            </li>
                            <li class="list-group-item">
                                <div className='float-start fw-bold col-4'>Intervalo de Pago:</div>
                                <div className='col'>{loanInfo.loan.intervaloPago}</div>
                            </li>
                            <li class="list-group-item">
                                <div className='float-start fw-bold col-4'>Fecha de creacion:</div>
                                <div className='col'>{loanInfo.loan.fechaCreacion}</div>
                            </li>
                            <li class="list-group-item">
                                <div className='float-start fw-bold col-4'>Riesgo:</div>
                                <div className='col'>{loanInfo.loan.riesgo}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </>
    );
}
export default LoanDetail;