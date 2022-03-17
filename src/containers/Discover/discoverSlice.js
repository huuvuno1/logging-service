import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logs: [],
  totalCount: [], // paging
  totalRecord: []
}

export const counterSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {
    changeData: (state, action) => {
      action.logs && (state.logs = action.logs) 
      action.totalCount && (state.totalCount = action.totalCount)
      action.totalRecord && (state.totalRecord = action.totalRecord)
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeData } = counterSlice.actions

export default counterSlice.reducer