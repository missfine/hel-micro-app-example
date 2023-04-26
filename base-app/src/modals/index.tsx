import { Modal } from 'antd';

import MicroApp from '../entry';

const { TabModal, DirectExportModal, UseBeforeExportModal } = MicroApp;

export const ModalInfo = (props: any) => Modal.info(props);
export const TabModalInfo = (props: any) => TabModal.info(props);
export const DirectExportModalInfo = (props: any) => DirectExportModal.info(props);
export const UseBeforeExportModalInfo = (props: any) => UseBeforeExportModal.info(props);
