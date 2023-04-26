import React from 'react';
import ReactDOM from 'react-dom';
import ReactIs from 'react-is';
import moment from 'moment';
import * as antd from 'antd';
import { bindExternals, bindReactRuntime, preFetchLib } from 'hel-micro';

import reportWebVitals from './reportWebVitals';

bindReactRuntime({ React, ReactDOM, ReactIs });

bindExternals({ moment, antd });

(async function () {
    await preFetchLib('micro-app', {
        custom: {
            host: 'http://localhost:9000',
            enable: true,
        },
        skip404Sniff: true,
    });
    await import('./loadApp');
})().catch(console.error);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
