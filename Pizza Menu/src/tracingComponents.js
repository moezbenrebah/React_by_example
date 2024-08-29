import React from 'react';
import ReactDOM from 'react-dom/profiling';
import { unstable_trace as trace } from 'scheduler/tracing';
import App from './App';

trace('Render', performance.now(), () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
});