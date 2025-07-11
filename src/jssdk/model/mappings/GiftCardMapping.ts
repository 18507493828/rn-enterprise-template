import { t } from 'i18next';

// 卡类型枚举
export enum CardType {
    Unknown = 0,
    PHYSICAL = 1,
    Ecode = 2,
    Receipt = 3,
    CashReceipt = 4,
    HorizontalImage,
    WhiteboardImage,
    FullImage,
}

// 卡交易快慢枚举
export enum CardFastType {
    Slow = 0,
    Fast = 1,
}

// 卡类型映射值
export const CardTypeMapping: Record<number, string> = {
    [CardType.Unknown]: 'unknown',
    [CardType.PHYSICAL]: 'physical',
    [CardType.Ecode]: 'code',
    [CardType.Receipt]: 'receipt',
    [CardType.CashReceipt]: 'cash_receipt',
    [CardType.HorizontalImage]: 'horizontal_image',
    [CardType.WhiteboardImage]: 'whiteboard_image',
    [CardType.FullImage]: 'full_image',
};

// 交易快慢映射值
export const CardFastTypeMapping: Record<number, string> = {
    [CardFastType.Slow]: 'slow',
    [CardFastType.Fast]: 'fast',
};
