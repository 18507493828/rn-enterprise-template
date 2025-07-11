import DefaultView from '@components/DefaultView';
import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SwitchLanguage from './examples/SwitchLanguage';

const TestScreen = () => {
    return (
        <DefaultView style={styles.container}>
            <SwitchLanguage />
        </DefaultView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TestScreen;
