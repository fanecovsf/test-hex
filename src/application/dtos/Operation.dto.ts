import { Operation } from "@/domain/entities/Operation";

export class CreateOperationDTO {
    constructor(public name: string) {}
}

export class UpdateOperationDTO {
    constructor(public name: string) {}
}

export class OperationResponseDTO {
    constructor(public id: string, public name: string) {}

    static fromDomain(operation: Operation): OperationResponseDTO {
        return new OperationResponseDTO(operation.id, operation.name)
    }
}
