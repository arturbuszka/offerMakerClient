export interface loginUser {
    userName: string;
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}