import { Permission } from "./Permission";
import { Operation } from "./Operation";

export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public password: string,
        public operation: Operation,
        public permissions?: Permission[]
    ) {}

    static create(email: string, password: string, operation: Operation, permissions?: Permission[]) {
        return new User("", email, password, operation, permissions);
    }
}