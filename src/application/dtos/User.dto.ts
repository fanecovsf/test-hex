import { User } from "@/domain/entities/User";

export class CreateUserDTO {
    constructor(public email: string, public password: string) {}
}

export class UserResponseDTO {
    constructor(public id: string, public email: string) {}

    static fromDomain(user: User): UserResponseDTO {
        return new UserResponseDTO(user.id, user.email)
    }
}

export class UpdateUserDTO {
    constructor(public email: string) {}
}