import { t } from 'i18next';
import React, {
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
    useCallback,
    useEffect,
} from 'react';
import { View, FlatList, StyleSheet, Animated, RefreshControl, Platform } from 'react-native';
import { COLORS, COMMON_STYLES } from '@common/CommonStyle';
import { Hud, NoDataView, SearchBar, TextInner } from '@components/index';
import { scaleSize } from '@utils/ScreenUtil';

const RefreshableList = (
    {
        showRefresh = true,
        placeholder = t('search'),
        btnTitle = t('rank_button_unlock'),
        isMore,
        onSearch,
        showItemLine = false,
        showBtn = false,
        data,
        renderItem,
        onRefresh,
        onPress,
        onEndReached, //上拉加载
        refreshing = false,
        customHeader = null,
        searchKey, //搜索的字段名称key
        showSearch = false,
        emptyTop = scaleSize(150),
        emptyText = t('empty_tip'),
        style,
        listBackgroundColor = '#fff',
        showHud = false,
        hideHud = false,
        keyExtractor,
    },
    ref,
) => {
    const flatListRef = useRef();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchValue, setSearchValue] = useState('');

    const handleRefresh = async () => {
        await onRefresh?.();
    };

    useImperativeHandle(ref, () => ({
        //滚动到顶部
        scrollToTop: () => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
        },
    }));

    useEffect(() => {
        //是否需要禁用Hud 默认不禁用
        if (hideHud) {
            return;
        }
        //控制Hud显示隐藏
        if (Platform.OS == 'ios') {
            showHud ? Hud.show() : Hud.hide();
        }
    }, [showHud]);

    const renderListEmptyComponent = useCallback(
        () => (
            <NoDataView
                btnTitle={btnTitle}
                showBtn={showBtn}
                isVisible={refreshing}
                tipTitle={emptyText}
                marginTop={emptyTop}
                onPress={() => {
                    onPress && onPress();
                }}
                onClick={() => {
                    onRefresh && onRefresh();
                }}
            />
        ),
        [refreshing],
    );

    // 列表的分割线
    const renderItemSeparator = () => (
        <View
            style={{
                height: 1,
                backgroundColor: showItemLine ? '#EFEFEF' : COLORS.transparent,
                marginHorizontal: scaleSize(16),
            }}
        />
    );

    const getListData = () => {
        return !showSearch
            ? data
            : data?.filter(v =>
                  v[`${searchKey}`]?.toLowerCase().includes(searchValue.toLowerCase()),
              );
    };

    // 列表上拉加载没有数据时
    const renderListFooter = () =>
        isMore && getListData()?.length > 0 ? (
            <View style={COMMON_STYLES.centerVertically}>
                <TextInner style={{ color: COLORS.secondary }}>{t('loading')}...</TextInner>
            </View>
        ) : (
            getListData()?.length >= 10 && (
                <View style={COMMON_STYLES.centerVertically}>
                    <TextInner style={{ color: COLORS.secondary }}>
                        {t('no_more_date_tip')}
                    </TextInner>
                </View>
            )
        );

    const onEndReachedOnfresh = () => {
        if (!refreshing && isMore) {
            onEndReached && onEndReached();
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: listBackgroundColor }]}>
            {showSearch && (
                <SearchBar
                    isVisible={showSearch}
                    onChangeText={kerWord => {
                        onSearch && onSearch(kerWord);
                        setSearchValue(kerWord);
                    }}
                    onSubmitEditing={text => {
                        setSearchValue(text);
                    }}
                    placeholder={placeholder}
                    style={[styles.searchBar]}
                />
            )}

            <FlatList
                ref={flatListRef}
                style={style}
                data={getListData()}
                renderItem={renderItem}
                keyExtractor={keyExtractor ? keyExtractor : (item, index) => `${item}-${index}`}
                onEndReached={onEndReachedOnfresh}
                onEndReachedThreshold={0.1}
                scrollEventThrottle={16}
                refreshControl={
                    showRefresh && (
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    )
                }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderItemSeparator}
                ListFooterComponent={renderListFooter}
                ListHeaderComponent={customHeader}
                ListEmptyComponent={renderListEmptyComponent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    refreshHeader: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    headerText: {
        fontSize: 14,
        color: '#666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    customRefreshControl: {
        position: 'absolute',
        top: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        marginHorizontal: scaleSize(16),
    },
});

export default forwardRef(RefreshableList);
