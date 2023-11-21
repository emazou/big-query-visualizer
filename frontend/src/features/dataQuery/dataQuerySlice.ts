import { SavedQuery } from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type SavedQueryState = {
    value: SavedQuery | null;
};

const initialState: SavedQueryState  = {
    value: null,
};
/**
 * A slice that provides methods for interacting with the current saved-query selected.
 */
const dataQuerySlice = createSlice({
    name: 'currentQuery',
    initialState,
    reducers: {
        setCurrentQuery: (state, action: PayloadAction<SavedQuery>) => {
            state.value = action.payload;
        },
        removeCurrentQuery: (state) => {
            state.value = null;
        },
    },
});

export const { setCurrentQuery, removeCurrentQuery  } = dataQuerySlice.actions;
export default dataQuerySlice.reducer;