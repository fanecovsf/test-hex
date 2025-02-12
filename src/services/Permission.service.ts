import { GetAllPermissionsUseCase } from "@/application/use-cases/permission/get-all-permissions.use-case";
import { GetPermissionByIdUseCase } from "@/application/use-cases/permission/get-permission-by-id.use-case";
import { PermissionResponseDTO } from "@/application/dtos/Permission.dto";
import { PermissionRepository } from "@/domain/ports/Permission.repository";

export class PermissionService {
    constructor(private permissionRepository: PermissionRepository) {}

    async getAllPermissions(): Promise<PermissionResponseDTO[]> {
        const getAllPermissionsUseCase = new GetAllPermissionsUseCase(this.permissionRepository);
        return await getAllPermissionsUseCase.execute();
    }

    async getPermissionById(id: string): Promise<PermissionResponseDTO> {
        const getPermissionById = new GetPermissionByIdUseCase(this.permissionRepository);
        return await getPermissionById.execute(id);
    }
}
