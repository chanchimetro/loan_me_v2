import axios from "axios";

let url = "http://10.152.2.102:4433/api/profile/";

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

export {
	axiosGetUserInfo,
	axiosChangePwd,
	axiosChangeCredit
};