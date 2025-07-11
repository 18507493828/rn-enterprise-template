import ResultCode from '@jssdk/config/ResultCode';

export type ErrorCode = number;
export type ErrorMap = Record<ErrorCode, string>;

export const ErrorDescription: ErrorMap = {
    [ResultCode.INVALID_VERIFICATION_CODE]: 'error_description_verification_invalid',
    [ResultCode.INVALID_PHONE_NUMBER]: 'error_description_mobile_invalid',
    [ResultCode.INVALID_COUNTRY_ID]: 'error_description_mobile_country_inconsistent',
    [ResultCode.PASSWORD_INCORRECT]: 'error_description_password_correct',
    [ResultCode.NO_TOKEN_PROVIDED]: 'error_description_token_no_provided',
    [ResultCode.SESSION_EXPIRED]: 'error_description_session_expired',
    [ResultCode.INVALID_TOKEN]: 'error_description_invalid_login_token',
    [ResultCode.USER_RECORD_NOT_EXIST]: 'error_description_phone_no_registered',
    [ResultCode.ACCOUNT_PASSWORD_ERROR]: 'error_description_password_wrong',
    [ResultCode.USER_ID_INCORRECT]: 'error_description_userId_incorrect',
    [ResultCode.USER_UPDATE_FAILED]: 'error_description_userInfo_update_fail',
    [ResultCode.LOGIN_LIMIT_REGISTER]: 'error_description_register_again',
    [ResultCode.SEND_MSG_LIMIT]: 'error_description_verification_attempts',
    [ResultCode.SMS_TEMPLATE_NOT_EXIST]: 'error_description_sms_exist',
    [ResultCode.SMS_SENDING_TOO_FREQUENT]: 'error_description_sending_frequently',
    [ResultCode.ILLEGAL_OPERATION]: 'error_description_illegal_operation',
    [ResultCode.PHONE_NUMBER_NOT_EXIST]: 'error_description_phone_number_no_exist',
    [ResultCode.WALLET_BANK_ACCOUNT_EXISTS]: 'error_description_bank_exist',
    [ResultCode.WALLET_BANK_ACCOUNT_NO_EXISTS]: 'error_description_bank_no_exist',
};
