import { Toast } from '@components/Toast';
import Clipboard from '@react-native-clipboard/clipboard';
import { t } from 'i18next';

//文字复制成功提示
const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Toast.success(t('copied'));
};

// 防止重复点击
const noDoubleClick = (func, apartTime = 1000) => {
    const curTime = Date.now();
    if (!global.preTime || curTime - global.preTime > apartTime) {
        func();
        global.preTime = curTime;
    }
};

const verifyFormWithKey = (key: any) => {
    switch (key) {
        case 'firstName':
            Toast.warning(t('toast_enter_firstName'));
            break;
        case 'lastName':
            Toast.warning(t('toast_enter_lastName'));
            break;
        case 'country':
            Toast.warning(t('toast_select_country'));
            break;
        case 'correct':
            Toast.warning(t('toast_enter_correct_phoneNumber'));
            break;
        case 'phoneNum':
            Toast.warning(t('toast_enter_phone_number'));
            break;
        case 'newPassWord':
            Toast.warning(t('toast_enter_password'));
            break;
        case 'againPassWord':
            Toast.warning(t('toast_enter_againPassword'));
            break;
        case 'code':
            Toast.warning(t('toast_enter_code'));
            break;
        case 'verificationCode':
            Toast.warning(t('toast_enter_numericVerification'));
            break;
        case 'diffrent':
            Toast.warning(t('toast_enter_password_inconsistent'));
            break;
        case 'null':
            Toast.warning(t('toast_enter_empty_tip'));
            break;
        case 'whole':
            Toast.warning(t('toast_enter_whole'));
            break;
        case 'privacy':
            Toast.warning(t('toast_agree_privacyPolicy'));
            break;
        case 'same':
            Toast.warning(t('toast_password_same'));
            break;
        case 'six':
            Toast.warning(t('toast_password_characters'));
            break;
        case 'passwordRules':
            Toast.warning(t('toast_password_rules'));
            break;
        case 'passwordError':
            Toast.warning(t('toast_password_wrong'));
            break;
        case 'empty':
            Toast.warning(t('toast_content_empty'));
            break;
        //其他
        default:
            break;
    }
};
//银行卡显示
const maskBankCard = (cardNumber: any) => {
    return cardNumber.replace(/^.*(\d{4})$/, '**** **** **** $1');
};

const truncateText = (text: string, maxLength: number) => {
    if (text?.length == 0 || !text) {
        return '';
    }
    return text.length > maxLength ? text.substring(0, maxLength) + '*' : text;
};

export default {
    truncateText,
    verifyFormWithKey,
    copyToClipboard,
    maskBankCard,
    noDoubleClick,
};
