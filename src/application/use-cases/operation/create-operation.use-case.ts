import { OperationRepository } from "@/domain/ports/Operation.repository";
import { CreateOperationDTO, OperationResponseDTO } from "@/application/dtos/Operation.dto";
import { Operation } from "@/domain/entities/Operation";

export class CreateOperationUseCase {
    constructor(private operationRepository: OperationRepository) {}

    async execute(data: CreateOperationDTO): Promise<OperationResponseDTO> {
        const operation = Operation.create(data.name);
        const operationDto = new CreateOperationDTO(operation.name);
        const createdOperation = await this.operationRepository.create(operationDto);

        return OperationResponseDTO.fromDomain(createdOperation);
    }
}
