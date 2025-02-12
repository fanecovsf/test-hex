import { PermissionRepository } from "@/domain/ports/Permission.repository";
import { PermissionResponseDTO } from "@/application/dtos/Permission.dto";

export class GetAllPermissionsUseCase {
    constructor(private permissionRepository: PermissionRepository) {}

    async execute(): Promise<PermissionResponseDTO[]> {
        const permissions = await this.permissionRepository.findAll();
        return permissions.map(PermissionResponseDTO.fromDomain);
    }
}
