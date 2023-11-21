import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import FormSaveQuery from '@/components/Forms/FormSaveQuery';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { SavedQuery } from '@/types';

/**
 * @description Mock reducer to test the component, 
 * it is necessary to use the store to render the component
 */
const mockReducer = (state = {
    user:{
        value: {
            id: 1,
            username: 'test',
            email: 'email@test.com',
            first_name: 'test',
            last_name: 'test',
        }}
}) => state; 
const store = configureStore({
    reducer: mockReducer,
});
const mockQuery ={
    country_code: 'test',
    indicator_code: 'test',
    end_year: 2021,
    start_year: 2020,
} as SavedQuery;
describe('FormSaveQuery', () => {
    test('renders inputs fields for name and description', () => {
        render(
            <Provider store={store}>
                <FormSaveQuery
                    setOpen={() => {}}
                    key="key-test" 
                    query={mockQuery} />
            </Provider>
        );
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    });
});