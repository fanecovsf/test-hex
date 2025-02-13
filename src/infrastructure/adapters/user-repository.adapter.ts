import prisma from "@/config/prisma";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/User.repository";
import { ParsedUrlQuery } from "querystring";
import { AddPermissionDTO } from "@/application/dtos/Permission.dto";
import { CreateUserDTO } from "@/application/dtos/User.dto";
import { UpdateUserDTO } from "@/application/dtos/User.dto";
import { Operation } from "@/domain/entities/Operation";


export class PrismaUserRepository implements UserRepository {
    async create(user: CreateUserDTO): Promise<User> {
        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                operationId: user.operationId,
                permissions: !user.permissions?.permissionIds.length? undefined : {
                    create: user.permissions.permissionIds.map((permissionDto) => ({
                        permission: { connect: { id: permissionDto } }
                    }))
                }
            },
            include: { permissions: { include: { permission: true } }, operation: true }
        });
        return new User(createdUser.id, createdUser.email, createdUser.password, createdUser.operation, createdUser.permissions.map((p) => p.permission));
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id }, include: { permissions: { include: { permission: true } }, operation: true } });
        return user ? new User(user.id, user.email, user.password, user.operation, user.permissions.map((p) => p.permission)) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email }, include: { permissions: { include: { permission: true } }, operation: true } });
        return user ? new User(user.id, user.email, user.password, user.operation) : null;
    }

    async findAll(filter: ParsedUrlQuery): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: filter,
            include: {
                permissions: {
                    include: {
                        permission: {
                            select: {
                                id: true,
                                name: true,
                                nickname: true
                            }
                        }
                    }
                },
                operation: true
            }
        });


        return users.map(user => {
            const permissions = user.permissions.map(p => p.permission);
            return new User(user.id, user.email, "", user.operation, permissions);
        });
    }

    async edit(id: string, user: UpdateUserDTO, permissions: AddPermissionDTO | undefined): Promise<User> {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...user,
                permissions: !permissions?.permissionIds.length? undefined : {
                    deleteMany: {},
                    create: permissions.permissionIds.map((permissionDto) => ({
                        permission: { connect: { id: permissionDto } }
                    }))
                }
            },
            include: { permissions: { include: { permission: true } }, operation: true }
        });
    
        return new User(
            updatedUser.id,
            updatedUser.email,
            updatedUser.password,
            updatedUser.operation,
            updatedUser.permissions.map((p) => p.permission)
        );
    }

    async delete(id: string): Promise<User> {
        return await prisma.user.delete({ where: { id }, include: { operation: true } });
    }
}

