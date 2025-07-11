// 扩展性配置
const extendedConfig = require('./extendedConfig.json');

export default {
    appInfo: {
        name: 'rnTemplate',
    },
    chat: {
        chatCompaniesId: '20002', //固定ID
        chatCompaniesName: 'APP用户(b)', //固定用户名
    },
    system: {
        debugger: true,
    },
    userAgreement: {
        termsConditionsUrl:
            'https://app.termly.io/policy-viewer/policy.html?policyUUID=86d62c60-849b-4ad0-a392-fc6381554ab2',
        privacyPolicyUrl:
            'https://app.termly.io/policy-viewer/policy.html?policyUUID=340960b8-4598-4abe-99a3-614c165eaadb',
        enable: true,
    },
    ...extendedConfig,
};
