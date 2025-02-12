import { User } from "@/domain/entities/User";
import { Permission } from "@prisma/client";

export class CreateUserDTO {
    constructor(public email: string, public password: string, public permissions?: Permission[]) {}
}

export class UserResponseDTO {
    constructor(public id: string, public email: string, public permissions?: Permission[]) {}

    static fromDomain(user: User): UserResponseDTO {
        return new UserResponseDTO(user.id, user.email, user.permissions)
    }
}

export class UpdateUserDTO {
    constructor(public email: string, public permissions?: Permission[]) {}
}