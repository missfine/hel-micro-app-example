import React, { useState, useEffect } from 'react';
import { Button, message, Modal } from 'antd';

import MicroApp from './entry';
import { ModalInfo, DirectExportModalInfo, UseBeforeExportModalInfo, TabModalInfo } from 'src/modals';

import './App.scss';

message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
});

const { TabModal, DirectExportModal, UseBeforeExportModal } = MicroApp;

export default () => {

    useEffect(() => {
        //结果为true
        console.log('主应用import的Modal与window.antd.Modal是否一致', Modal === window.antd.Modal);
    }, []);

    useEffect(() => {
        console.log('MicroApp', { ...MicroApp });
        console.log('Modal对象与微模块从antd直接导出对象是否为同一个', Modal === DirectExportModal);
        console.log('Modal对象与微模块从antd获取使用后导出的对象是否为同一个', Modal === UseBeforeExportModal);
    }, []);

    const [ baseModal, setBaseModal ] = useState({ visible: false });
    const [ tabModal, setTabModal ] = useState({ visible: false });
    const [ directExportModal, setDirectExportModal ] = useState({ visible: false });
    const [ useBeforeExportModal, setUseBeforeExportModal ] = useState({ visible: false });

    return (
        <div className="App">
            <div className="components-test">
                <div className="title">
                    基座应用直接引入的Modal
                </div>
                <div className="components-inline">
                    <Button onClick={() => setBaseModal({ visible: true })}>打开对话框</Button>
                    <Button
                        onClick={() => Modal.info({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        打开Info对话框
                    </Button>
                    <Modal
                        title="测试对话框"
                        open={baseModal.visible}
                        onCancel={() => setBaseModal({ visible: false })}
                    >
                        测试对话框内容
                    </Modal>
                </div>
                <div className="title">
                    微模块封装后的Modal
                </div>
                <div className="components-inline">
                    <Button onClick={() => setTabModal({ visible: true })}>打开对话框</Button>
                    <Button
                        onClick={() => TabModal.info({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        打开Info对话框
                    </Button>
                    <TabModal
                        title="测试对话框"
                        open={tabModal.visible}
                        onCancel={() => setTabModal({ visible: false })}
                    >
                        测试对话框内容
                    </TabModal>
                </div>
                <div className="title">
                    微模块直接导出的Modal
                </div>
                <div className="components-inline">
                    <Button onClick={() => setDirectExportModal({ visible: true })}>打开对话框</Button>
                    <Button
                        onClick={() => DirectExportModal.info({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        打开Info对话框
                    </Button>
                    <DirectExportModal
                        title="测试对话框"
                        open={directExportModal.visible}
                        onCancel={() => setDirectExportModal({ visible: false })}
                    >
                        测试对话框内容
                    </DirectExportModal>
                </div>
                <div className="title">
                    微模块导入使用后导出的Modal
                </div>
                <div className="components-inline">
                    <Button onClick={() => setUseBeforeExportModal({ visible: true })}>打开对话框</Button>
                    <Button
                        onClick={() => UseBeforeExportModal.info({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        打开Info对话框
                    </Button>
                    <UseBeforeExportModal
                        title="测试对话框"
                        open={useBeforeExportModal.visible}
                        onCancel={() => setUseBeforeExportModal({ visible: false })}
                    >
                        测试对话框内容
                    </UseBeforeExportModal>
                </div>
                <div className="title">
                    从微模块导入的各种Modal.info()
                </div>
                <div className="components-inline">
                    <Button
                        onClick={() => ModalInfo({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        ModalInfo
                    </Button>
                    <Button
                        onClick={() => DirectExportModalInfo({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        DirectExportModalInfo
                    </Button>
                    <Button
                        onClick={() => UseBeforeExportModalInfo({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        UseBeforeExportModalInfo
                    </Button>
                    <Button
                        onClick={() => TabModalInfo({
                            title: 'Info对话框',
                            content: 'Info对话框',
                            maskClosable: true,
                        })}
                    >
                        TabModalInfo
                    </Button>
                </div>
            </div>
        </div>
    );
};
