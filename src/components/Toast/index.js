import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ToastContainer from './ToastContainer';

let toastRef = null;

const ToastManager = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = toast => {
        // setToasts(prev => [...prev, toast]);
        //只会弹出最后最新的toast
        setToasts([toast]);
    };

    const removeToast = () => {
        setToasts(prev => (prev.length > 0 ? prev.slice(1) : prev));
    };

    useEffect(() => {
        toastRef = { addToast, removeToast };
    }, []);

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {toasts.map((toast, index) => (
                <ToastContainer
                    key={index}
                    {...toast}
                    onClose={() => {
                        removeToast();
                        toast.onClose && toast.onClose();
                    }}
                />
            ))}
        </View>
    );
};

export const Toast = {
    /**
     * 隐藏当前显示的 Toast
     */
    hide: () => {
        toastRef?.removeToast();
    },

    /**
     * 通用
     */
    show: ({ message, iconName, iconColor, duration, onClose }) => {
        toastRef?.addToast({ message, iconName, iconColor, duration, onClose });
    },

    /**
     * 成功
     */
    success: (message, duration = 2000, onClose) => {
        toastRef?.addToast({
            message,
            iconName: 'check-circle',
            duration,
            onClose,
        });
    },

    /**
     * 错误
     */
    error: (message, duration = 2000, onClose) => {
        toastRef?.addToast({
            message,
            iconName: 'failed',
            duration,
            onClose,
        });
    },

    /**
     * 警告
     */
    warning: (message, duration = 2000, onClose) => {
        toastRef?.addToast({
            message,
            iconName: 'tips',
            duration,
            onClose,
        });
    },
};

export default ToastManager;
