/* eslint-disable react/display-name */
import type { NextPage } from 'next';
import { useAppSelector } from './hooks';
import { useRouter } from 'next/router';
import {useValidateTokenMutation} from '@/features/user/userAPI';
import { useEffect } from 'react';

/**
 * @description HOC to validate authentication in pages,
 *  if the user is not authenticated, it will be redirected to the initial page
 * @param Component 
 * @returns Component with authentication validation
 */
const withValidatePageAuthentication = <T extends Record<string, unknown>>(
    Component: NextPage<T>
) => (props: T) => {
        const token = useAppSelector((state) => state.user.token);
        const user = useAppSelector((state) => state.user.value);
        const { push, pathname } = useRouter();
        
        const [validateToken] = useValidateTokenMutation();
        useEffect(() => {
            if (token) {
                validateToken(token)
                    .unwrap()
                    .then((res) => {
                        if (res.success) return true;
                    })
                    .catch(() => {
                        push('/');
                    });
            } else if (!['/login', '/register', '/'].includes(pathname)) {
                push('/');
            }
            if (user && ['/login', '/register', '/'].includes(pathname)) { 
                push('/visual-query-builder');
            }
        },[token, user, pathname]);

        return <Component {...props} />;
    };

export default withValidatePageAuthentication;