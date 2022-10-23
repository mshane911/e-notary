export interface CometUser{
    name: string,
    username: string,
    password: string,
    role: "employee" | "company" | "notary"
}