//密码正则校验
export const regexNumberAndLetter = text => {
    const regex =
        /^(?:(?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]))[\w!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{6,}$/;
    return regex.test(text);
};

//数字验证
export const regexNumber = text => {
    const regex = /^[0-9]*$/;
    if (regex.test(text)) {
        return true;
    }
};
//银行卡验证
export const regexBankCard = text => {
    const regex = /^\d{10}$/;
    if (regex.test(text)) {
        return true;
    }
};

//验证码校验
export const regexVerificationCode = text => {
    const regex = /^\d{6}$/;
    if (regex.test(text)) {
        return true;
    }
};

//银行卡用户名校验
export const regexBankCardName = text => {
    const regex = /^[a-zA-Z][a-zA-Z\\s.',-]{0,48}[a-zA-Z.]$/;
    if (regex.test(text)) {
        return true;
    }
};

export const specialCharacters = value => {
    return value.replace(/[^a-zA-Z0-9 _,-]/g, '');
};

export const prohibit = value => {
    if (/[\u4E00-\u9FA5]/g.test(value)) {
        return true;
    }
};

/**
 * 格式化数字，如果有小数最多显示两位，否则不显示
 * @param {*} num
 * @returns
 */
export const formatNumber = num => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(2).replace(/\.?0+$/, '');
};

// 加纳 export const ghanaPhoneRegex = /^(233)0?(20|2[3-8]|5[4-7]|59)\d{7}$/
// 肯尼亚 export const kenyaPhoneRegex = /^(254)0?((1[0-1]|7[0-3]|7[5-9])\d{7}|(74[0-8])\d{6})$/
// 尼日利亚 export const PhoneRegex = /^(234)0?(70|8[0-1]|9[0-1])\d{8}$/

// 加纳手机号校验规则
export const ghanaPhoneRegex = text => {
    const regex = /^(233)0?(20|2[3-8]|5[4-7]|59)\d{7}$/;
    if (regex.test(text)) {
        return true;
    }
    return false;
};

// 尼日利亚手机号校验规则
export const nigeriaPhoneRegex = text => {
    const regex = /^(234)0?(70|8[0-1]|9[0-1])\d{8}$/;
    if (regex.test(text)) {
        return true;
    }
    return false;
};
// 肯尼亚
export const kenyaPhoneRegex = text => {
    const regex = /^(254)0?((1[0-1]|7[0-3]|7[5-9])\d{7}|(74[0-8])\d{6})$/;
    if (regex.test(text)) {
        return true;
    }
    return false;
};

/**
 * 检查字符串中是否至少包含指定数量的不同数字
 * @param {*} str
 * @param {*} differentNumbers
 * @returns
 */
export const hasAtLeastDifferentNumbers = (str, differentNumbers) => {
    // 使用正则表达式提取字符串中的所有数字
    const numbers = str.match(/\d/g) || []; // \d 匹配所有数字，g 表示全局查找

    // 使用 Set 去重，并检查唯一数字个数
    return new Set(numbers).size < parseInt(differentNumbers, 10);
};
