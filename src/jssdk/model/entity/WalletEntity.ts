interface AddBankEntity {
    account_name: string;
    account_number: string;
    password: string;
    bank_id: string;
    old_account_name: string;
    old_account_number: string;
}
interface WithdrawEntity {
    amount: string;
    password: number;
    bank_id: string;
}
