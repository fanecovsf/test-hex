export class Operation {
    constructor(
        public readonly id: string,
        public name: string
    ) {}

    static create(name: string) {
        return new Operation("", name)
    }
}