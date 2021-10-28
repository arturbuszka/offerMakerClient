export interface ChangeUserPasswordModel {
    userId: string;
    securityStamp: string;
    password: string;
}