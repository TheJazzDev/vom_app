import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type:
    | 'service'
    | 'meeting'
    | 'celebration'
    | 'outreach'
    | 'aniversary'
    | 'harvest';
  attendees: string[];
}

interface EventsState {
  events: Event[];
  upcomingEvents: Event[];
  isLoading: boolean;
}

const initialState: EventsState = {
  events: [],
  upcomingEvents: [],
  isLoading: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      // Filter upcoming events
      const now = new Date();
      state.upcomingEvents = action.payload.filter(
        (event) => new Date(event.date) >= now,
      );
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      // Update upcoming events if the new event is in the future
      if (new Date(action.payload.date) >= new Date()) {
        state.upcomingEvents.push(action.payload);
      }
    },
    updateEvent: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Event> }>,
    ) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id,
      );
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload.updates,
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export function useEventSlice() {
  const state = useSelector(({ events }: RootState) => events);

  return {
    ...state,
    ...eventsSlice.actions,
  };
}

export default eventsSlice.reducer;
