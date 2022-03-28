import axiosClient from "../axiosClient";

const BASE_URL = 'https://logging-serivice-production.up.railway.app'

const logApi = {
    filter: async (params) => {
        const query = Object.keys(params || {}).reduce((prev, curr) => {
            return prev + (params[curr] ? `&${curr}=${params[curr]}` : '')
        }, '?')

        const url = `${BASE_URL}/v1/logs` + query;
        const data = await axiosClient.get(url);
        return {
            data: data.data.data,
            meta: data.data.meta
        }
    },
    getOverview: async () => {
        const url = `${BASE_URL}/v1/logs/overview`
        return axiosClient.get(url)
    },
    fetchListService: async () => {
        const url = `${BASE_URL}/v1/logs/services`
        const response = await axiosClient.get(url)
        return response.data.data
    }
};

export default logApi;
