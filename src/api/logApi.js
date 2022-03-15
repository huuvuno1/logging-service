import axiosClient from "./axiosClient";

const logApi = {
    filter: (keyword, ) => {
        const url = '/v1/auth/login';
        return axiosClient.post(url, { username, password });
    }
};

export default logApi;