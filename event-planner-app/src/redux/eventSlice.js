import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import eventsData from '../assets/event_dataset_from_eventbrite.json'; // Adjust path as needed

// Define fetchEvents to use local JSON
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  // Log data to ensure correct structure
  console.log('Raw events data:', eventsData);
  console.log('Number of events:', eventsData.length);
  return eventsData; // Use the JSON data directly
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
