import React, { useEffect, useMemo } from 'react';
import { Modal, ModalFuncProps, ModalProps } from 'antd';

import './index.scss';

export type ModalSizeKey = 'small' | 'default' | 'large';

const modalSize: Record<ModalSizeKey, number> = {
    small: 480,
    default: 600,
    large: 1000,
};

export interface TabModalProps extends ModalProps {
    size?: ModalSizeKey;
}

const defaultFuncModalSize = modalSize['small'];

declare global {
    interface Window {
        antd: any;
    }
}

const TabModal = (props: TabModalProps) => {

    useEffect(() => {
        console.log('TabModal', Modal === window.antd.Modal);
    }, []);

    const {
        visible,
        open = visible,
        children,
        size = 'default',
        width,
        ...others
    } = props;

    const modalWidth = useMemo(() => {
        return width ? width : modalSize[size] || modalSize['default'];
    }, [ size, width ]);

    return (
        <Modal
            open={open}
            width={modalWidth}
            maskClosable={true}
            {...others}
        >
            {children}
        </Modal>
    );
};

TabModal.info = (props: ModalFuncProps) => Modal.info({
    icon: null,
    maskClosable: true,
    width: defaultFuncModalSize,
    ...props,
});
TabModal.success = (props: ModalFuncProps) => Modal.success({
    icon: null,
    maskClosable: true,
    width: defaultFuncModalSize,
    ...props,
});
TabModal.error = (props: ModalFuncProps) => Modal.error({
    icon: null,
    maskClosable: true,
    width: defaultFuncModalSize,
    ...props,
});
TabModal.warning = (props: ModalFuncProps) => Modal.warning({
    icon: null,
    maskClosable: true,
    width: defaultFuncModalSize,
    ...props,
});
TabModal.warn = (props: ModalFuncProps,) => Modal.warn({
    icon: null,
    maskClosable: true,
    width: defaultFuncModalSize,
    ...props,
});
TabModal.confirm = (props: ModalFuncProps,) => Modal.confirm({
    icon: null,
    maskClosable: true,
    width: defaultFuncModalSize,
    ...props,
});
TabModal.destroyAll = () => Modal.destroyAll();

export default TabModal;

export const UseBeforeExportModal = Modal;
