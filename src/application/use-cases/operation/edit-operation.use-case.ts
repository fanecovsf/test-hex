import { OperationRepository } from "@/domain/ports/Operation.repository";
import { UpdateOperationDTO, OperationResponseDTO } from "@/application/dtos/Operation.dto";

export class EditOperationUseCase {
    constructor(private operationRepository: OperationRepository) {}

    async execute(id: string, data: UpdateOperationDTO): Promise<OperationResponseDTO> {
        return await this.operationRepository.edit(id, data);
    }
}

