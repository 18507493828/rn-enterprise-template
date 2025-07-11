import { useEffect, useRef } from 'react';

type UseAutoRequestProps<T extends Record<string, any>> = {
    data: T; // 数据对象
    onRequest: (data: T) => void; // 请求回调函数
    debounceTime?: number; // 防抖时间
};

export const useAutoRequest = <T extends Record<string, any>>({
    data,
    onRequest,
    debounceTime = 300,
}: UseAutoRequestProps<T>) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // 检查字段是否都不为空
        const hasEmptyFields = Object.values(data || {}).some(value => {
            return value === null || value === undefined || value === '';
        });

        if (hasEmptyFields) {
            return;
        }

        // 防抖处理
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            onRequest(data); // 当数据变化且非空时触发请求
        }, debounceTime);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data, onRequest, debounceTime]);
};
