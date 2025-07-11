import React, { PureComponent } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { scaleSize } from '@utils/ScreenUtil';
import { Cell, TextInner } from '@components/index';
import { COLORS } from '@common/CommonStyle';
import { withTranslation } from 'react-i18next';

class CellList extends PureComponent {
    static defaultProps = {
        data: [],
    };

    render() {
        const { t } = this.props;
        const {
            data,
            onChange,
            ListHeaderComponent,
            ListFooterComponent,
            cellRightInnerAction,
            scrollOptions,
        } = this.props;
        return (
            <ScrollView {...(scrollOptions || {})}>
                {ListHeaderComponent && ListHeaderComponent}
                {data.map((item, i) => {
                    const cellOptions = item.cellOptions || {};
                    const options = {
                        title: t(item.title),
                        iconName: item.iconName,
                        icon: item.icon,
                        subValue: item.rightTitle,
                        isArrow: Boolean(item.screen),
                        style: item.style,
                        isLine: item.showBottomLine,
                        subInner: cellRightInnerAction && cellRightInnerAction(item, i),
                        ...cellOptions,
                    };

                    if (item.hide) {
                        return null;
                    }

                    if (item.subTitle) {
                        options.custInner = (
                            <View style={styles.rowCell}>
                                <TextInner style={styles.cellTitle}>{t(item.title)}</TextInner>
                                <TextInner style={styles.subTitle} ellipsizeMode={'tail'}>
                                    {item.subTitle}
                                </TextInner>
                            </View>
                        );
                    }

                    if (item.isLast) {
                        options.isLine = false;
                        options.style = styles.lastCell;
                    }

                    return (
                        <Cell
                            key={i}
                            linStyle={styles.line}
                            onPress={() => onChange && onChange(item, i)}
                            {...options}
                        />
                    );
                })}
                {ListFooterComponent && ListFooterComponent}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        marginLeft: scaleSize(16),
        backgroundColor: '#E6E6E6',
        height: 1,
        width: '90%',
    },
    cellTitle: {
        fontSize: scaleSize(16),
        color: COLORS.black,
    },
    subTitle: {
        marginTop: scaleSize(2),
        fontSize: scaleSize(14),
        lineHeight: 22,
        color: COLORS.textSecondary,
    },
    rowCell: {
        marginRight: scaleSize(60),
    },
    lastCell: {
        marginBottom: scaleSize(10),
    },
});

export default withTranslation()(CellList);
