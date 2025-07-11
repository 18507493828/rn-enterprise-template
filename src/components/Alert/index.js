import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import AlertModal from './AlertModal';

let sibling = null;

class Alert {
    static show({
        title = '',
        content = '',
        buttons = [],
        onConfirm = () => {},
        onCancel = () => {},
        contentComponent = null,
        children = null,
        ...otherProps
    }) {
        if (sibling) return; // 防止重复弹窗

        sibling = new RootSiblings(
            (
                <AlertModal
                    title={title}
                    content={content}
                    buttons={buttons}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    children={children}
                    contentComponent={contentComponent}
                    onClose={Alert.hide}
                    isVisible
                    {...otherProps}
                />
            ),
        );
    }

    static hide() {
        if (sibling) {
            sibling.destroy();
            sibling = null;
        }
    }
}

export default Alert;
