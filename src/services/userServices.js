import axios from "axios";

let url = "http://localhost:4433/api/profile/";

const axiosGetUserInfo = async (sessionId) => {
	return await axios.get(url + "getUserInfo", {
		headers: {
			"Authorization": sessionId
		}
	});
};

const axiosChangePwd = async (data, sessionId) => {
	return await axios.patch(url + "changePwd", data, {
		headers: {
			"Authorization": sessionId
		}
	})
};

const axiosChangeCredit = async (data, sessionId) => {
	return await axios.patch(url + "changeCredit", data, {
		headers: {
			"Authorization": sessionId
		}
	})
};

const axiosRequestPwdRestore = async (username) => {
    return await axios.post(url+'requestRestorePwd', {username});
}

const axiosRestorePwd = async (restoreId, newPwd) => {
	console.log("axrpwd", newPwd);
    return await axios.put(url+'restorePwd/'+restoreId, {newPwd});
}

export {
	axiosGetUserInfo,
	axiosChangePwd,
	axiosChangeCredit,
	axiosRequestPwdRestore,
	axiosRestorePwd
};