import axiosClient from "./axiosClient";

const userApi = {
    login: (username, password) => {
        const url = '/v1/auth/login';
        return axiosClient.post(url, { username, password });
    }
};

export default userApi;