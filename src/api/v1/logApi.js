import axiosClient from "../axiosClient";

const logApi = {
    filter: async (params) => {
        const query = Object.keys(params || {}).reduce((prev, curr) => {
            return prev + (params[curr] ? `&${curr}=${params[curr]}` : '')
        }, '?')

        const url = 'http://localhost:8081/v1/logs' + query;
        const data = await axiosClient.get(url);
        return {
            data: data.data.data,
            meta: data.data.meta
        }
    },
    getOverview: async () => {
        const url = 'http://localhost:8081/v1/logs/overview'
        return axiosClient.get(url)
    },
    fetchListService: async () => {
        const url = 'http://localhost:8081/v1/logs/services'
        const response = await axiosClient.get(url)
        return response.data.data
    }
};

export default logApi;
