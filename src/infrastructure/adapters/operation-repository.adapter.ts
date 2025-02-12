import { CreateOperationDTO } from "@/application/dtos/Operation.dto";
import prisma from "@/config/prisma";
import { Operation } from "@/domain/entities/Operation";
import { OperationRepository } from "@/domain/ports/Operation.repository";
import { ParsedUrlQuery } from "querystring";


export class PrismaOperationRepository implements OperationRepository {
    async findAll(filter: ParsedUrlQuery): Promise<Operation[]> {
        return await prisma.operation.findMany({ where: filter });
    }

    async findById(id: string): Promise<Operation | null> {
        return await prisma.operation.findUnique({ where: { id } });
    }

    async create(operation: CreateOperationDTO): Promise<Operation> {
        return await prisma.operation.create({ data: operation });
    }

    async edit(id: string, operation: Partial<Operation>): Promise<Operation> {
        return await prisma.operation.update({ where: { id }, data: operation });
    }

    async delete(id: string): Promise<Operation> {
        return await prisma.operation.delete({ where: { id } });
    }
}
