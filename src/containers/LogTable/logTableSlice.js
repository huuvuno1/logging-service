import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logApi from '../../api/logApi';

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
    },
    reducers: {
        change: (state, action) => {
            state.value = action.payload;
        },
    },
    extraReducers: {},
});

const { reducer, actions } = logsSlice;
export const { change } = actions;

export default reducer;
