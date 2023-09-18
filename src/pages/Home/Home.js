import React, { useContext, useEffect } from 'react';
import { loansContext } from '../../contexts/loansContext';
import { userContext } from '../../contexts/userContext';

function Home() {
	let user = useContext(userContext);
	let loans = useContext(loansContext);
	useEffect(() => {
		if (user.user.SessionId != "" ) {
			
		}
	}, [])

	return (
		<div className='text-center'>Home</div>
	);
}
export default Home;