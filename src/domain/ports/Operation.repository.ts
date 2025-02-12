import { Operation } from "../entities/Operation";
import { ParsedUrlQuery } from "querystring";
import { CreateOperationDTO } from "@/application/dtos/Operation.dto";

export interface OperationRepository {
    create(operation: CreateOperationDTO): Promise<Operation>;
    findById(id: string): Promise<Operation | null>;
    findAll(filter: ParsedUrlQuery): Promise<Operation[]>;
    edit(id: string, operation: Partial<Operation>): Promise<Operation>;
    delete(id: string): Promise<Operation>;
}
