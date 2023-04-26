import React, { useState } from 'react';
import { Button, message } from 'antd';

import { TabModal } from 'src/components';

import 'src/app.scss';

message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
});

export default () => {

    const [ modal, setModal ] = useState({ visible: false });

    return (
        <div className={'App'}>
            <div className="components-test">
                <div className="title">
                    Layout组件测试
                </div>
                <div className="components-inline">
                    <Button onClick={() => setModal({ visible: true })}>打开对话框</Button>
                    <Button
                        onClick={() => TabModal.info({
                            title: 'Info对话框',
                            content: 'Info对话框',
                        })}
                    >
                        打开Info对话框
                    </Button>
                </div>
                <TabModal
                    title="测试对话框"
                    open={modal.visible}
                    onCancel={() => setModal({ visible: false })}
                >
                    测试对话框内容
                </TabModal>
            </div>
        </div>
    );
};
