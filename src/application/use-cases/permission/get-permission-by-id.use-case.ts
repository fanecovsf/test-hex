import { PermissionRepository } from "@/domain/ports/Permission.repository";
import { PermissionResponseDTO } from "@/application/dtos/Permission.dto";

export class GetPermissionByIdUseCase {
    constructor(private permissionRepository: PermissionRepository) {}

    async execute(id: string): Promise<PermissionResponseDTO> {
        const permission = await this.permissionRepository.findById(id);
        if (!permission) throw new Error("Usuário não encontrado")
        return PermissionResponseDTO.fromDomain(permission);
    }
}
