import { Images } from '@assets/images';

export function getThirdLoginConfig() {
    const config = [
        {
            key: 'FaceBook',
            name: 'FaceBook',
            id: 1,
            url: '',
            source: Images.login_facebook,
        },
        {
            key: 'Google',
            name: 'Google',
            id: 2,
            url: '',
            source: Images.login_google,
        },
    ];
    return config;
}
