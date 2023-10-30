import './ValidateUser.css';
import React, { useContext, useEffect, useState } from 'react';
import { loansContext } from '../../contexts/loansContext';
import { userContext } from '../../contexts/userContext';
import { Link } from 'react-router-dom';
import { axiosValidateUser } from '../../services/authServices';

function ValidateUser() {
    let user = useContext(userContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let token = urlParams.get('token');
        axiosValidateUser(token);
        setIsLoading(false);
    }, []);

    return (
        isLoading ?
            <div className='text-center'>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <>
                <span className='container-fluid title d-flex w-75 rounded mx-auto mt-5 p-3'>
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