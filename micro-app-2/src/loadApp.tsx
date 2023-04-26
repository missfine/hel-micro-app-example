import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

import App from './app';

const getHostNode = (id = 'root') => {
    let node = document.getElementById(id);
    if (!node) {
        node = document.createElement('div');
        node.id = id;
        document.body.appendChild(node);
    }
    return node;
};

ReactDOM.createRoot(getHostNode('root')).render((
    <React.StrictMode>
        <ConfigProvider locale={zh_CN} autoInsertSpaceInButton={false}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>
));
