import React, { forwardRef, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import NumericKeyboard from './index';
import { scaleSize } from '@utils/ScreenUtil';
import { FONT_SIZES, FONT_WEIGHTS } from '@common/CommonStyle';
import { Divider, TextInner } from '@components/index';

const KeyboardActionSheet = forwardRef(
    (
        {
            onClose,
            onKeyPress,
            onDelete,
            title,
            sheetContainerStyle,
            headerContainer,
            gestureEnabled = true,
            ...otherProps
        },
        ref,
    ) => {
        const localRef = useRef(null);

        const handleKeyPress = key => {
            onKeyPress && onKeyPress(key);
        };

        const handleDelete = () => {
            onDelete && onDelete();
        };

        let sheetProps = {};
        if (headerContainer) {
            sheetProps = {
                gestureEnabled,
                ...otherProps,
            };
        }

        return (
            <ActionSheet
                onBeforeClose={onClose}
                ref={ref || localRef}
                containerStyle={[title && styles.sheetContainer, sheetContainerStyle]}
                {...sheetProps}
            >
                {title && (
                    <View style={styles.header}>
                        <TextInner style={styles.title}>{title}</TextInner>
                    </View>
                )}
                {headerContainer}

                {/* 顶部如果存在容器，默认显示分割线 */}
                {headerContainer && <Divider />}

                <NumericKeyboard onKeyPress={handleKeyPress} onDelete={handleDelete} />
            </ActionSheet>
        );
    },
);

const styles = StyleSheet.create({
    sheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FFF',
        paddingVertical: scaleSize(10),
    },
    header: {
        alignItems: 'center',
        marginBottom: scaleSize(10),
    },
    title: {
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
    },
});

export default KeyboardActionSheet;
