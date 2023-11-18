import { SavedQuery } from '@/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type SavedQueryState = {
    value: SavedQuery | null;
};

const initialState: SavedQueryState  = {
    value: null,
};
/**
 * A slice that provides methods for interacting with the user endpoint. 
 * Contains the initial state, reducers, and actions.
 * name: The name of the slice. This will be the name of the reducer.
 * initialState: The initial state of the slice.
 * reducers: An object containing the reducers for the slice.
 * actions: An object containing the actions for the slice.
 * setUser: A reducer that sets the user, status, and error.
 * setToken: A reducer that sets the token.
 * removeUser: A reducer that removes the user,  
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