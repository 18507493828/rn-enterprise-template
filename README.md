# React Native 万能模板项目

本项目是基于 React Native `0.76.6` 构建的高可扩展、功能完善的通用模板，适用于中大型商业级 App 开发，已集成多种常用组件和高频业务功能，支持快速迭代与上线。

---

## 📦 依赖核心功能说明

### ✅ 一、基础能力

| 功能模块   | 使用依赖包                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| 网络请求   | `axios`, `@react-native-community/netinfo`                                                                     |
| 国际化     | `i18next`, `react-i18next`                                                                                     |
| 本地缓存   | `@react-native-async-storage/async-storage`                                                                    |
| 配置管理   | `react-native-config`                                                                                          |
| 加密与安全 | `crypto-js`, `react-native-biometrics`, `react-native-fast-rsa`, `react-native-get-random-values`, `spark-md5` |
| 状态管理   | `zustand`（轻量灵活）                                                                                          |
| 错误监控   | `@sentry/react-native`                                                                                         |

---

### ✅ 二、导航系统

| 类型         | 使用依赖包                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------- |
| 底部导航     | `@react-navigation/bottom-tabs`                                                                   |
| 抽屉导航     | `@react-navigation/drawer`, `react-native-drawer-layout`                                          |
| 栈导航       | `@react-navigation/native-stack`, `@react-navigation/stack`                                       |
| 依赖基础设施 | `react-native-screens`, `react-native-safe-area-context`, `@react-native-masked-view/masked-view` |

---

### ✅ 三、UI & 动画交互

| 类型                   | 使用依赖包                                                    |
| ---------------------- | ------------------------------------------------------------- |
| 动作面板 / ActionSheet | `react-native-actions-sheet`                                  |
| 启动图                 | `react-native-bootsplash`                                     |
| 图标库                 | `react-native-vector-icons`                                   |
| 线性渐变               | `react-native-linear-gradient`                                |
| 手势交互               | `react-native-gesture-handler`, `react-native-reanimated`     |
| 轮播图/分页            | `react-native-reanimated-carousel`, `react-native-pager-view` |
| 日历控件               | `react-native-calendars`, `dayjs`                             |
| 标签页                 | `react-native-tab-view`                                       |
| 自定义弹窗 / 遮罩      | `react-native-root-siblings`                                  |
| 键盘优化               | `react-native-keyboard-controller`                            |

---

### ✅ 四、原生能力拓展

| 功能            | 使用依赖包                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| 文件管理        | `react-native-fs`, `react-native-blob-util`                                                             |
| 相册 & 图片选择 | `react-native-image-crop-picker`, `@react-native-camera-roll/camera-roll`, `react-native-image-viewing` |
| 二维码生成      | `react-native-qrcode-svg`, `react-native-svg`                                                           |
| 剪贴板          | `@react-native-clipboard/clipboard`                                                                     |
| 系统信息        | `react-native-device-info`                                                                              |
| 内嵌浏览器      | `react-native-webview`                                                                                  |
| 应用内评价      | `react-native-in-app-review`                                                                            |
| 消息推送        | `react-native-onesignal`                                                                                |
| 客服聊天        | `@intercom/intercom-react-native`                                                                       |

---

### ✅ 五、开发维护

| 功能             | 使用依赖包                                 |
| ---------------- | ------------------------------------------ |
| 类型支持         | `@types/lodash`                            |
| 工具函数库       | `lodash`, `buffer`                         |
| 依赖补丁管理工具 | `patch-package`, `postinstall-postinstall` |

## 🚀 适用场景

- 企业级商业 App 快速搭建
- 多语言、多环境配置
- 需要较多原生能力集成的中大型项目
- 高质量 UI/UX 动画交互需求
- 可拓展的脚手架模板改造

---

## 📌 注意事项

- React Native 版本：`0.76.6`
- Node.js 推荐版本：`18.x`
- JDK 推荐版本：`17`（兼容 Android 构建）

---

> 本模板为你构建完整的商业 App 提供良好起点，支持进一步扩展业务模块或接入私有服务。

## Step 1: 安装依赖库

```bash
# using npm
npm install

# OR using Yarn
yarn
```

构建ios 链接包

```bash
npx pod-install
```

## Step 2: 启动应用服务

在项目根目录，执行以下命令来启动RN服务：

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

如果需要清除缓存运行执行以下命令

```bash
npx react-native start --reset-cache
```

## Step 3: 运行应用

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

### 更改环境配置

要更新项目中的环境配置文件（如 `.env`, `.env.dev`, `.env.pre`, `.env.staging`）中的版本信息，请使用以下命令。此命令将自动增加 `APP_VERSION_CODE` 和 `IOS_BUILD_NUM`，并根据传入的版本号更新 `APP_VERSION`。

```bash
#首次使用时候，确保脚本具有执行权限：
1.chmod +x script/updateEnv.sh

# 使用 shell 执行脚本，并传入新的版本号
./script/updateEnv.sh --version=x.x.x

# 示例：将 APP_VERSION 更新为 1.1.0
./script/updateEnv.sh --version=1.1.0



```
