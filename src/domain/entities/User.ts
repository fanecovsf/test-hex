export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public password: string
    ) {}

    static create(email: string, password: string) {
        return new User("", email, password);
    }
}