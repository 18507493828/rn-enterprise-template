import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ModalContent from './ModalContent';

let modalInstance = null;

const CustomModal = {
    show: (content, options = {}) => {
        if (modalInstance) {
            CustomModal.hide(); // 确保只有一个 Modal 实例
        }
        modalInstance = new RootSiblings(
            <ModalContent content={content} {...options} onClose={CustomModal.hide} />,
        );
    },
    hide: () => {
        if (modalInstance) {
            modalInstance.destroy();
            modalInstance = null;
        }
    },
};

export default CustomModal;
