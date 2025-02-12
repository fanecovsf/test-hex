export class Permission {
    constructor(
        public readonly id: string,
        public name: string,
        public nickname: string
    ) {}

    static create(name: string, nickname: string) {
        return new Permission("", name, nickname);
    }
}