import axios from "axios";

let url = "http://10.152.2.128:4433/api/loans/";

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

const axiosGetLoanById = async (sessionId, loanId) => {
    return await axios.get(url + "getLoanById", {
        "LoanId": loanId
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
};

const axiosPostLoanOffer = async (sessionId, loan) => {
    return await axios.get(url + "createLoanOffer", {
        "Loan": {
            "monto": loan.monto,
            "interes": loan.interes,
            "plazoPago": loan.plazoPago,
            "intervaloPago": loan.intervaloPago,
            "riesgo": loan.riesgo
        }
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
};

const axiosPostLoanRequest = async (sessionId, loan) => {
    return await axios.get(url + "createLoanRequest", {
        "Loan": {
            "monto": loan.monto,
            "interes": loan.interes,
            "plazoPago": loan.plazoPago,
            "intervaloPago": loan.intervaloPago,
            "riesgo": loan.riesgo
        }
    }, {
        headers: {
            "Authorization": sessionId
        }
    });
};

export {
    axiosGetLoanOffers,
    axiosGetLoanRequests,
    axiosGetLoanById,
    axiosPostLoanOffer,
    axiosPostLoanRequest
};