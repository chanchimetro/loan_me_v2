import axios from "axios";

let url = "http://190.245.165.87:4433/api/loans/";

const axiosGetLoanOffers = async (sessionId) => {
    return await axios.get(url + "getLoanOffers", {
        headers: {
            "Authorization": sessionId
        }
    });
};

const axiosGetLoanRequests = async (sessionId) => {
    return await axios.get(url + "getLoanRequests", {
        headers: {
            "Authorization": sessionId
        }
    });
};

const axiosGetLoanById = async (loanId, sessionId) => {
    return await axios.get(url + "getLoanById/" + loanId, {
        headers: {
            "Authorization": sessionId
        }
    })
};

const axiosPostLoanOffer = async (sessionId, loan) => {
    return await axios.post(url + "createLoanOffer", {
        "Loan": {
            "monto": parseFloat(loan.monto),
            "interes": parseFloat(loan.interes),
            "plazoPago": loan.plazoPago,
            "intervaloPago": loan.intervaloPago,
            "riesgo": parseInt(loan.riesgo),
            "walletId": "",
            "returnWalletId": loan.returnWalletId,
            "walletChain": loan.walletChain
        }
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
};

const axiosPostLoanRequest = async (sessionId, loan) => {
    return await axios.post(url + "createLoanRequest", {
        "Loan": {
            "monto": parseFloat(loan.monto),
            "interes": parseFloat(loan.interes),
            "plazoPago": loan.plazoPago,
            "intervaloPago": loan.intervaloPago,
            "riesgo": parseInt(loan.riesgo),
            "walletId": loan.walletId,
            "returnWalletId": "",
            "walletChain": loan.walletChain
        }
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
};

const axiosProposeCompleteLoan = async (sessionId, loanId, walletId) => {
    return await axios.post(url + "proposeCompleteLoan", {
        "LoanId": loanId,
        "walletId": walletId
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
}

const axiosCompleteLoan = async (sessionId, loanId, UserId) => {
    return await axios.patch(url + "completeLoan", {
            "LoanId": loanId,
            "walletId": "",
            "UserId": UserId
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
}

const axiosGetAcceptedCurrencies = async () => {
    return await axios.get("http://190.245.165.87:4433/api/payment/getAcceptedCurrencies");
}

const axiosAddTxn = async (sessionId, loanId, txnId) => {
    return await axios.post("http://190.245.165.87:4433/api/payment/addTxn", {
        "txn":{
            "LoanId": loanId,
            "txnId": txnId
        }
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
}

export {
    axiosGetLoanOffers,
    axiosGetLoanRequests,
    axiosGetLoanById,
    axiosPostLoanOffer,
    axiosPostLoanRequest,
    axiosProposeCompleteLoan,
    axiosCompleteLoan,
    axiosGetAcceptedCurrencies,
    axiosAddTxn,
};