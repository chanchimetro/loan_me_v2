import axios from "axios";

let url = "http://localhost:4433/api/auth/";

const axiosLogin = async (user) => {
    return await axios.post(url+"login", user);
};

const axiosRegister = async (user) => {
    console.log(user)
    return await axios.post(url+"register", user)
};

const axiosLogout = async (sessionId) => {
    return await axios.post(url+"logout", {}, {
        headers: {
            "Authorization":sessionId
        }
    });
};

const axiosValidateUser = async (token) => {
    return await axios.post(url+'confirmUser/'+token);
};

export {
    axiosLogin,
    axiosRegister,
    axiosLogout,
    axiosValidateUser
};