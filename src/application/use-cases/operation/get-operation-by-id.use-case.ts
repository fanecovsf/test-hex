import { OperationRepository } from "@/domain/ports/Operation.repository";
import { OperationResponseDTO } from "@/application/dtos/Operation.dto";

export class GetOperationByIdUseCase {
    constructor(private operationRepository: OperationRepository) {}

    async execute(id: string): Promise<OperationResponseDTO> {
        const operation =  await this.operationRepository.findById(id);
        if (!operation) throw new Error("Operação não encontrada");
        return OperationResponseDTO.fromDomain(operation);
    }
}
