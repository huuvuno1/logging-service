import axiosClient from "../axiosClient";

const BASE_URL = 'https://logging-serivice-production.up.railway.app'

const logApi = {
    filter: async (params) => {
        const query = Object.keys(params || {}).reduce((prev, curr) => {
            return prev + (params[curr] ? `&${curr}=${params[curr]}` : '')
        }, '?')

        const url = `${BASE_URL}/v2/logs` + query;
        const response = await axiosClient.get(url);
        const data = {
            "totalResult": response.data.data.body.hits.hits.map(item => item._source),
            "totalCount": response.data.data.body.hits.total
        }
        return { data, meta: response.data.meta }
    },
    getOverview: async () => {
        const url = `${BASE_URL}/v2/logs/overview`
        return axiosClient.get(url)
    },
    fetchListService: async () => {
        const url = `${BASE_URL}/v2/logs/services`
        const response = await axiosClient.get(url)
        return response.data.body.hits.hits
    },
    logTracking: async (time_start, time_end) => {
        const url = `${BASE_URL}/v2/logs/log-tracking?time_start=${time_start}&time_end=${time_end}`
        return (await (await axiosClient.get(url)).data.data)
    }
};

export default logApi;