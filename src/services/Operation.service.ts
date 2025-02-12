import { CreateOperationUseCase } from "@/application/use-cases/operation/create-operation.use-case";
import { DeleteOperationUseCase } from "@/application/use-cases/operation/delete-operation.use-case";
import { EditOperationUseCase } from "@/application/use-cases/operation/edit-operation.use-case";
import { GetAllOperationsUseCase } from "@/application/use-cases/operation/get-all-operations.use-case";
import { GetOperationByIdUseCase } from "@/application/use-cases/operation/get-operation-by-id.use-case";
import { OperationRepository } from "@/domain/ports/Operation.repository";
import { CreateOperationDTO, OperationResponseDTO } from "@/application/dtos/Operation.dto";
import { ParsedUrlQuery } from "querystring";
import { UpdateOperationDTO } from "@/application/dtos/Operation.dto";

export class OperationService {
    constructor(private operationRepository: OperationRepository) {}

    async getAllOperations(filter: ParsedUrlQuery): Promise<OperationResponseDTO[]> {
        const getAllOperationsUseCase = new GetAllOperationsUseCase(this.operationRepository);
        return await getAllOperationsUseCase.execute(filter);
    }

    async getOperationById(id: string): Promise<OperationResponseDTO> {
        const getOperationByIdUseCase = new GetOperationByIdUseCase(this.operationRepository);
        return await getOperationByIdUseCase.execute(id);
    }

    async editOperation(id: string, data: UpdateOperationDTO): Promise<OperationResponseDTO> {
        const editOperationUseCase = new EditOperationUseCase(this.operationRepository);
        return await editOperationUseCase.execute(id, data);
    }

    async deleteOperation(id: string): Promise<OperationResponseDTO> {
        const deleteOperationUseCase = new DeleteOperationUseCase(this.operationRepository);
        return await deleteOperationUseCase.execute(id);
    }

    async createOperation(data: CreateOperationDTO): Promise<OperationResponseDTO> {
        const createOperationUseCase = new CreateOperationUseCase(this.operationRepository);
        return await createOperationUseCase.execute(data);
    }
}
