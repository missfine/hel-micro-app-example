import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zh_CN from 'antd/es/locale/zh_CN';
import App from './App';

moment.locale('zh-cn');

const getHostNode = (id = 'root') => {
    let node = document.getElementById(id);
    if (!node) {
        node = document.createElement('div');
        node.id = id;
        document.body.appendChild(node);
    }
    return node;
};

console.log('ConfigProvider对象是否为同一个', ConfigProvider === window.antd.ConfigProvider);

ReactDOM.createRoot(getHostNode('root')).render(
    <React.StrictMode>
        <ConfigProvider locale={zh_CN} autoInsertSpaceInButton={false}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>
);
