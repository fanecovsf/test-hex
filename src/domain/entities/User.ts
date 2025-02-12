import { Permission } from "./Permission";

export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public password: string,
        public permissions?: Permission[]
    ) {}

    static create(email: string, password: string, permissions?: Permission[]) {
        return new User("", email, password, permissions);
    }
}