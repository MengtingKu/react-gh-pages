import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// 引入 icons.js
import './utils/icons.js';
import './assets/all.scss';
import router from '@routes';
import { Provider } from 'react-redux';
import { store } from '@/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </Provider>
);
