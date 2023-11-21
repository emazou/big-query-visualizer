import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import FormLogin from '@/components/Forms/FormLogin';
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

describe('FormLogin', () => {
    test('renders inputs fields for username and password', () => {
        render(
            <Provider store={store}>
                <FormLogin />
            </Provider>
        );
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
    test('displays error message when username is empty', async () => {
        render(
            <Provider store={store}>
                <FormLogin />
            </Provider>
        );
        fireEvent.submit(screen.getByRole('button', { name: /send/i }));
        await waitFor(() => {
            expect(screen.getByText(/please input your username!/i)).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(
                screen.getByText(/your password must be at least 8 characters long/i)
            ).toBeInTheDocument();
        });
    });
    test('displays error message when password is empty', async () => {
        render(
            <Provider store={store}>
                <FormLogin />
            </Provider>
        );
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'test' },
        });
        fireEvent.submit(screen.getByRole('button', { name: /send/i }));
        await waitFor(() => {
            expect(
                screen.getByText(/your password must be at least 8 characters long/i)
            ).toBeInTheDocument();
        });
    });
});