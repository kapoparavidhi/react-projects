// twubricSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTwubricData = createAsyncThunk(
  "twubric/fetchData",
  async () => {
    const response = await axios.get(
      "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json"
    );
    return response.data;
  }
);

const twubricSlice = createSlice({
  name: "twubric",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    startDate: null,
    endDate: null,
  },
  reducers: {
    setStartDate: (state, action) => {
        state.startDate = action.payload;
      },
      setEndDate: (state, action) => {
        state.endDate = action.payload;
      },
      removeDataOutOfRange: (state) => {
        state.data = state.data.filter(user => {
          const joinDate = new Date(user.join_date);
          
          //(console.log(joinDate))
          return(!state.startDate || joinDate >= state.startDate) &&
                 (!state.endDate || joinDate <= state.endDate);
        });
      },
    sortData: (state, action) => {
      const { sortBy } = action.payload;
      state.data = state.data.sort((a, b) => a.twubric[sortBy] - b.twubric[sortBy]);
    },
    removeData: (state, action) => {
      const { username } = action.payload;
      state.data = state.data.filter((user) => user.username !== username);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTwubricData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTwubricData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTwubricData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { sortData, removeData,setStartDate, setEndDate,removeDataOutOfRange } = twubricSlice.actions;
export default twubricSlice.reducer;