import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';
import { BORDER_RADIUS, COLORS, FONT_SIZES } from '@common/CommonStyle';
import { useTranslation } from 'react-i18next';

const SearchBar = ({
    placeholder,
    onChangeText,
    style,
    onSubmitEditing,
    isVisible,
    maxLength = 50,
    backgroundColor = COLORS.secondaryBack,
}) => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const handleSearch = text => {
        setSearchText(text);
        if (onChangeText) {
            onChangeText(text); // 回调实时搜索内容
        }
    };

    const clearSearch = () => {
        setSearchText('');
        if (onChangeText) {
            onChangeText(''); // 清空时回调空内容
        }
    };

    return isVisible ? (
        <View style={[styles.container, { backgroundColor }, style]}>
            <Icon name="search" size={20} color="#999" style={styles.icon} />
            <TextInput
                maxLength={maxLength}
                onSubmitEditing={text => {
                    onSubmitEditing && onSubmitEditing(text.nativeEvent.text);
                }}
                style={styles.input}
                placeholder={placeholder || `${t('search')}...`}
                value={searchText}
                onChangeText={handleSearch}
            />
            {searchText.length > 0 && (
                <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                    <Icon name="close1" size={20} color="#999" />
                </TouchableOpacity>
            )}
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.xLarge,
        paddingHorizontal: scaleSize(12),
        height: scaleSize(38),
    },
    icon: {
        marginRight: scaleSize(8),
    },
    input: {
        flex: 1,
        fontSize: FONT_SIZES.xSmall,
        color: '#333',
    },
    clearButton: {
        marginLeft: scaleSize(8),
    },
});

export default SearchBar;
