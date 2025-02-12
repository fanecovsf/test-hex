import { Permission } from "@prisma/client";

export class PermissionResponseDTO {
    constructor(public id: string, public name: string, public nickname: string) {}

    static fromDomain(permission: Permission): PermissionResponseDTO {
        return new PermissionResponseDTO(permission.id, permission.name, permission.nickname)
    }
}
