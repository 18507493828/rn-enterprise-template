import { setLoggerConfig, LoggerConfig, LOGI } from './lib/Logger';
import { PlatformType } from './lib/Types';
import { setDefaultConfig } from './config/Config';
import { initEventModule } from './lib/EventModule';
import { initStorageModule } from './lib/Storage';

const TAG = 'SDK';

interface SDKConfig {
    platformType: PlatformType; // 当前环境配置
    isDebugMode?: boolean; //是否调试模式
    loggerConfig?: LoggerConfig; // 日志配置
    extendedConfig?: any; // 扩展配置
    enableBusinessErrorHandling?: boolean; // 启动业务错误处理（开启会拦截200以外的状态码进入catch逻辑）
}

class SDK {
    // 基础配置
    private static baseConfig: any = {
        isDebugMode: false,
        enableBusinessErrorHandling: true,
    };

    /**
     * 初始化 SDK
     * @param config
     */
    public static initialize(config: SDKConfig): void {
        LOGI(TAG, 'SDK Initialized');
        const { platformType, loggerConfig } = config;

        // 设置基础配置
        this.setBaseConfig(config);

        // 设置环境配置
        this.setPlatformType(platformType);

        // 设置日志配置
        setLoggerConfig({ platformType, ...loggerConfig });

        // 初始化存储功能
        initStorageModule(platformType);

        // 初始化事件派发功能
        initEventModule(platformType);

        // 在这里可以扩展其他模块的配置
    }
    /**
     * 更新baseConfig配置
     */
    public static updateBaseConfig(baseConfig: any): void {
        setDefaultConfig(baseConfig);
    }
    /**
     * 设置平台环境配置，根据不同平台环境加载不同的配置或行为
     * @param environment
     */
    private static setPlatformType(platformType: PlatformType): void {
        switch (platformType) {
            case 'Web':
                LOGI(TAG, 'Running in Web Environment');
                // 针对 Web 环境的配置，可能包括浏览器相关的设置
                break;
            case 'Mobile':
                LOGI(TAG, 'Running in React Native Environment');
                // 针对 React Native 环境的配置，可能包括原生模块相关设置
                break;
            case 'other':
                LOGI(TAG, 'Running in Other Environment');
                // 未来扩展的其他环境的配置
                break;
            default:
                throw new Error(`Unsupported environment: ${platformType}`);
        }
    }

    /**
     * 设置基础配置
     * @param config
     */
    private static setBaseConfig(config: SDKConfig): void {
        const { platformType, isDebugMode, extendedConfig, ...other } = config;
        this.baseConfig = {
            platformType,
            ...this.baseConfig,
            ...other,
            ...(extendedConfig || {}),
        };
        typeof isDebugMode === 'boolean' && (this.baseConfig.isDebugMode = isDebugMode);

        // 设置默认配置
        this.updateDefaultConfig({ ...this.baseConfig });
    }

    /**
     * 获得基础配置
     * @returns
     */
    public static getBaseConfig(): any {
        return this.baseConfig;
    }

    /**
     * 更新默认配置
     * @param config
     */
    public static updateDefaultConfig(config: any) {
        setDefaultConfig(config);
    }
}

export default SDK;
