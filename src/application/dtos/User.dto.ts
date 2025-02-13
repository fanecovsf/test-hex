import { User } from "@/domain/entities/User";
import { Permission } from "@prisma/client";
import { AddPermissionDTO } from "./Permission.dto";
import { Operation } from "@/domain/entities/Operation";

export class CreateUserDTO {
    constructor(public email: string, public password: string, public operationId: string, public permissions?: AddPermissionDTO) {}
}

export class UserResponseDTO {
    constructor(public id: string, public email: string, public operation: Operation, public permissions?: Permission[]) {}

    static fromDomain(user: User): UserResponseDTO {
        return new UserResponseDTO(user.id, user.email, user.operation, user.permissions)
    }
}

export class UpdateUserDTO {
    constructor(public email: string, public operationId: string, public permissions?: Permission[]) {}
}