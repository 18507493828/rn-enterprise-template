interface SellGiftCardEntity {
    card_id: number; // 当前汇率结果标记
    symbol: string; // 货币符号
    country_id: number; // 国家 ID
    balance: string; // 卡余额
    card_type: number; // 卡片类型 ID
    is_fast: number; // 是否快速交易
    card_head_id: number; // 卡片头部 ID (可选）
    card_info: {
        code: string; // 卡号
        cvv?: string; // 卡背面 CVV（可选）
        expiration_date?: string; // 过期日期（可选）
        pin?: string; // 卡 PIN（可选）
    };
    images: {
        url: string; // 图片 URL
    }[];
}

interface GetPriceRateEntity {
    card_type_id: number; // 卡种 ID
    country_id: number; // 国家 ID
    balance: number; // 输入金额
    card_type: number; // 卡片类型
    is_fast: number; // 是否快速交易
}
