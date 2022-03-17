import { configureStore } from '@reduxjs/toolkit'
import logs from '../containers/LogTable/logTableSlice';


const rootReducer = {
    logs
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;