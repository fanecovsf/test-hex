import { Permission } from "@prisma/client";

export class PermissionResponseDTO {
    constructor(public id: string, public name: string, public nickname: string) {}

    static fromDomain(permission: Permission): PermissionResponseDTO {
        return new PermissionResponseDTO(permission.id, permission.name, permission.nickname)
    }
}

export class AddPermissionDTO {
    constructor(public permissionIds: string[]) {
        if (!Array.isArray(permissionIds)) {
            throw new Error("Lista de permissões inválida.");
        }
    }
}
