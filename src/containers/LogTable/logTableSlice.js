import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logApi from '../../api/v1/logApi';

const KEY = 'logs';

export const fetchInfoWebs = createAsyncThunk(
    `${KEY}/queryLogs`,
    async (query) => {
        const data = await logApi.filter(...query)
        return data;
    }
);

const logsSlice = createSlice({
    name: KEY,
    initialState: {
        value: [],
        currentPage: 1,
        totalFound: 0
    },
    reducers: {
        change: (state, action) => {
            const {totalResult, totalFound, currentPage} = action.payload
            totalResult && (state.value = totalResult);
            (totalFound || totalFound === 0) && (state.totalFound = totalFound);
            currentPage && (state.currentPage = currentPage);
        },
    },
    extraReducers: {},
});

const { reducer, actions } = logsSlice;
export const { change } = actions;

export default reducer;
