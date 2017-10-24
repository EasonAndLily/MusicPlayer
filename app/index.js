import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import './index.less';
import './component/header.less'
import Root from './component/root.js'

ReactDOM.render(
    <AppContainer>
        <Root/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./component/root', () => {
        const NewRoot = require('./component/root').default;
        ReactDOM.render(
            <AppContainer>
                <NewRoot/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}