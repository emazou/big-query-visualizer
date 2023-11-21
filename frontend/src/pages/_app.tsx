import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '@/app/store';
import { PersistGate } from 'redux-persist/integration/react';
import '@/styles/globals.css';

/**
 * @description Component to wrap the application, it contains the redux store and the persistor
 */
export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps}  />
            </PersistGate>
        </Provider>
    );
}