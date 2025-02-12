import { OperationRepository } from "@/domain/ports/Operation.repository";
import { OperationResponseDTO } from "@/application/dtos/Operation.dto";

export class DeleteOperationUseCase {
    constructor(private operationRepository: OperationRepository) {};

    async execute(id: string): Promise<OperationResponseDTO> {
        return await this.operationRepository.delete(id);
    }
}
