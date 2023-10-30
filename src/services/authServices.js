import axios from "axios";

let url = "http://10.152.2.102:4433/api/auth/";

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

export {
    axiosLogin,
    axiosRegister,
    axiosLogout
};