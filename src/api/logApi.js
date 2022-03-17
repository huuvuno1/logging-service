import axiosClient from "./axiosClient";

const logApi = {
    filter: async (params) => {
        const query = Object.keys(params || {}).reduce((prev, curr) => {
            return prev + (params[curr] ? `&${curr}=${params[curr]}` : '')
        }, '?')

        const url = 'http://localhost:8081/v1/logs' + query;
        return axiosClient.get(url);
    }
};

export default logApi;