import { OperationRepository } from "@/domain/ports/Operation.repository";
import { OperationResponseDTO } from "@/application/dtos/Operation.dto";
import { ParsedUrlQuery } from "querystring";

export class GetAllOperationsUseCase {
    constructor(private operationRepository: OperationRepository) {}

    async execute(filter: ParsedUrlQuery): Promise<OperationResponseDTO[]> {
        const operations = await this.operationRepository.findAll(filter);
        return operations.map(OperationResponseDTO.fromDomain);
    }
}
