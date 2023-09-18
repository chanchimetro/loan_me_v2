import axios from "axios";

let url = "http://190.245.165.87:4433/api/auth/";

const axiosLogin = async (user) => {
    return await axios.post(url+"login", user);
};

const axiosRegister = async (user) => {
    console.log(user)
    return await axios.post(url+"register", user)
};

const axiosLogout = async (sessionId) => {
    return await axios.post(url+"login", {}, {
        headers: {
            "Authorization":sessionId
        }
    });
};

export {
    axiosLogin,
    axiosRegister,
    axiosLogout
};