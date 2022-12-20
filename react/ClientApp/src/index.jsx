import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { Index } from './index';

render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('Index')
);