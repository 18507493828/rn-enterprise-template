import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ActionSheet, { ScrollView } from 'react-native-actions-sheet';
import { TextInner, Icon } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import {
    DEFAULT_BOTTOM_SPACE,
    DEFAULT_CONTAINER_SPACE,
    FONT_SIZES,
    FONT_WEIGHTS,
} from '@common/CommonStyle';
import ImageViewing from 'react-native-image-viewing';
import { useTranslation } from 'react-i18next';
const SelectableActionSheet = forwardRef(
    (
        {
            title,
            describe,
            data,
            onSelect,
            renderItem,
            customTriggerBtn,
            images,
            visible,
            setImageVisible,
        },
        ref,
    ) => {
        const { t } = useTranslation();
        const actionSheetRef = useRef(null);
        const [selectedItem, setSelectedItem] = useState(null);
        const [internalData, setInternalData] = useState([]);

        useEffect(() => {
            setInternalData(data);
        }, [data]);

        useImperativeHandle(ref, () => ({
            openActionSheet: () => {
                if (actionSheetRef.current) {
                    console.log('Opening ActionSheet');
                    actionSheetRef.current.show();
                } else {
                    console.warn('ActionSheet ref is not initialized');
                }
            },
            closeActionSheet: () => actionSheetRef.current?.hide(),
        }));

        const handleSelectItem = (item, index) => {
            setSelectedItem(item);
            onSelect?.(item, index);
            actionSheetRef.current?.hide();
        };

        return (
            <View>
                {customTriggerBtn ? (
                    customTriggerBtn
                ) : (
                    <TouchableOpacity
                        style={styles.trigger}
                        onPress={() => actionSheetRef.current?.show()}
                    >
                        <TextInner style={styles.triggerText}>
                            {selectedItem ? selectedItem.title : '-'}
                        </TextInner>
                        <Icon name="drop-down" size={24} color="#000" />
                    </TouchableOpacity>
                )}

                <ActionSheet
                    ref={actionSheetRef}
                    gestureEnabled
                    extraScroll={1}
                    containerStyle={styles.actionSheetContainer}
                >
                    {/* 图片预览 */}
                    <ImageViewing
                        images={images}
                        imageIndex={0}
                        visible={visible}
                        onRequestClose={() => setImageVisible(false)}
                    />
                    <View style={styles.sheetContainer}>
                        {title && <TextInner style={styles.titleText}>{title}</TextInner>}
                        {describe && <TextInner style={styles.describeText}>{describe}</TextInner>}
                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.contentView}>
                                {internalData.length === 0 ? (
                                    <TextInner style={styles.emptyText}>{t('empty_tip')}</TextInner>
                                ) : (
                                    internalData.map((item, index) =>
                                        renderItem ? (
                                            renderItem(item, handleSelectItem, selectedItem, index)
                                        ) : (
                                            <TouchableOpacity
                                                key={item.id}
                                                style={styles.item}
                                                onPress={() => handleSelectItem(item, index)}
                                            >
                                                <TextInner style={styles.itemTitle}>
                                                    {item.title}
                                                </TextInner>
                                                <TextInner style={styles.itemDescription}>
                                                    {item.description}
                                                </TextInner>
                                            </TouchableOpacity>
                                        ),
                                    )
                                )}
                            </View>
                        </ScrollView>
                    </View>
                </ActionSheet>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scaleSize(12),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    triggerText: {
        fontSize: FONT_SIZES.small,
        color: '#333',
    },
    actionSheetContainer: {
        maxHeight: '100%',
        height: '70%',
    },
    sheetContainer: {
        height: '100%',
        paddingVertical: scaleSize(5),
        // paddingBottom: DEFAULT_BOTTOM_SPACE,
    },
    scrollContainer: {
        flexShrink: 1,
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
    },
    contentView: {
        marginBottom: DEFAULT_BOTTOM_SPACE,
    },
    contentContainer: {
        // flexGrow: 1,
        paddingBottom: 16,
    },
    titleText: {
        alignSelf: 'center',
        marginBottom: scaleSize(10),
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
    },
    describeText: {
        fontSize: FONT_SIZES.xSmall,
        color: '#909090',
        paddingHorizontal: DEFAULT_CONTAINER_SPACE,
        marginBottom: scaleSize(10),
    },
    emptyText: {
        textAlign: 'center',
        fontSize: FONT_SIZES.small,
        color: '#999',
    },
    item: {
        padding: scaleSize(12),
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemTitle: {
        fontSize: FONT_SIZES.small,
        fontWeight: FONT_WEIGHTS.bold,
    },
});

export default SelectableActionSheet;
