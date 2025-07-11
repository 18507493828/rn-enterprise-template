import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import HudView from './HudView';

let rootSiblings = null;

const Hud = {
    /**
     * 显示 HUD
     * @param {Object} options
     */
    show: function (options = { timeout: 30000 }) {
        // 如果 HUD 已经存在，并且不是进度条 HUD，则直接返回
        if (rootSiblings && !options.showProgress) {
            return rootSiblings;
        }

        // 进度 HUD 需要不断更新，先关闭再创建
        if (options.showProgress) {
            Hud.hide();
        }

        // 通过映射方式选择合适的组件
        const componentMap = {
            customComponent: options.customComponent,
            title: options.title ? <HudView title={options.title} /> : null,
        };

        // 选择第一个不为空的组件
        const innerComponent = Object.values(componentMap).find(comp => comp) || <HudView />;

        rootSiblings = new RootSiblings(innerComponent);
        setTimeout(() => {
            if (rootSiblings) {
                rootSiblings.destroy();
            }
        }, options.timeout);
        return rootSiblings;
    },

    /**
     * 检查 HUD 是否显示中
     * @returns {boolean}
     */
    isShowing: function () {
        return rootSiblings !== null;
    },

    /**
     * 关闭 HUD
     */
    hide: function () {
        if (rootSiblings) {
            rootSiblings.destroy();
            rootSiblings = null;
        }
    },

    /**
     * 强制销毁 HUD，避免未彻底销毁导致的残留
     */
    destroy: function () {
        if (rootSiblings) {
            rootSiblings.destroy();
        }
        rootSiblings = new RootSiblings(null);
        rootSiblings.destroy();
        rootSiblings = null;
    },
};

export default Hud;
