import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormRegister from '@components/Forms/FormRegister';
import { screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

/**
 * @description Mock reducer to test the component, 
 * it is necessary to use the store to render the component
 */
const mockReducer = (state = {}) => state; 
const store = configureStore({
    reducer: mockReducer,
});

describe('FormRegister', () => {
    test('renders all input fields', async () => {
        render(
            <Provider store={store}>
                <FormRegister />
            </Provider>
        );
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText(/send/i)).toBeInTheDocument();
        expect(screen.getByText(/do you have an account\? login/i)).toBeInTheDocument();
    });

});
