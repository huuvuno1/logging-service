import axiosClient from "../axiosClient";

const logApi = {
    filter: async (params) => {
        const query = Object.keys(params || {}).reduce((prev, curr) => {
            return prev + (params[curr] ? `&${curr}=${params[curr]}` : '')
        }, '?')

        const url = 'http://localhost:8081/v2/logs' + query;
        const response = await axiosClient.get(url);
        const data = {
            "totalResult": response.data.data.body.hits.hits.map(item => item._source),
            "totalCount": response.data.data.body.hits.total
        }
        return { data, meta: response.data.meta }
    },
    getOverview: async () => {
        const url = 'http://localhost:8081/v2/logs/overview'
        return axiosClient.get(url)
    },
    fetchListService: async () => {
        const url = 'http://localhost:8081/v2/logs/services'
        const response = await axiosClient.get(url)
        return response.data.body.hits.hits
    }
};

export default logApi;