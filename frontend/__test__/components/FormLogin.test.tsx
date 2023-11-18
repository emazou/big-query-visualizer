// FormLogin.test.tsx

import React from 'react';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';
import { Provider } from 'react-redux';
import FormLogin from '@/components/Forms/FormLogin';
import { message } from 'antd';
import * as userAPI from '@/features/user/userAPI';
import { store } from '@/app/store';

jest.mock("../../src/features/user/userAPI");
describe('FormLogin', () => {
    test('renders the form with username and password inputs and submit button', () => {
        const mockLogin = jest.fn().mockResolvedValue({ 
            data: {},
            status: 200,
            success: true,
            message: 'Login successful',
        });
        const mockUseLoginMutation = jest.fn().mockReturnValue([mockLogin, { isLoading: false }]);
        (userAPI as jest.Mocked<typeof userAPI>).useLoginMutation.mockImplementation(mockUseLoginMutation);
    
        const { getByLabelText, getByText } = render(
            <Provider store={store}>
                <FormLogin />
            </Provider>
        );
        const usernameInput = getByLabelText(/username/i);
        const passwordInput = getByLabelText(/password/i);
        const submitButton = getByText(/submit/i);

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
});

