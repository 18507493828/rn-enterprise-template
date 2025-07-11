export const SIX_NUMBER = 6;

export function userDeleteConfig() {
    const config = [
        {
            value: '',
            showValue: '',
            title: 'phone',
            placeholder: 'profileEdit_placeholderPhone',
            show: false,
            key: 'Phone',
        },
        {
            value: '',
            title: 'password',
            placeholder: 'profileEdit_placeholderPassword',
            show: false,
            showValue: '',
            key: 'Password',
        },
    ];
    return config;
}
