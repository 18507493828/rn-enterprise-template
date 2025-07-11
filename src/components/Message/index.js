import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import MessageContainer from './MessageContainer';

class Message {
    static sibling = null;

    static show({
        type = 'success',
        title = 'Message',
        content = '',
        position = 'top',
        duration = 300,
        autoHide = true,
        autoHideDuration = 2000,
        ...otherProps
    }) {
        if (this.sibling) {
            this.hide(); // 如果已有消息显示，先隐藏旧的
        }

        this.sibling = new RootSiblings(
            (
                <MessageContainer
                    type={type}
                    title={title}
                    content={content}
                    position={position}
                    duration={duration}
                    onClose={this.hide}
                    onHide={() => {
                        this.sibling?.destroy();
                        this.sibling = null;
                    }}
                    {...otherProps}
                />
            ),
        );

        if (autoHide) {
            setTimeout(() => {
                this.hide();
            }, autoHideDuration);
        }
    }

    static hide() {
        if (this.sibling) {
            this.sibling.destroy();
            this.sibling = null;
        }
    }
}

export default Message;
