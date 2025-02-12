import prisma from "@/config/prisma";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/User.repository";
import { ParsedUrlQuery } from "querystring";
import { Permission } from "@prisma/client";


export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const createdUser = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                permissions: {
                    connect: user.permissions?.map((permission: Permission): { userId_permissionId: { userId: string, permissionId: string } } => ({
                        userId_permissionId: {
                            userId: createdUser.id,
                            permissionId: permission.id
                        }
                    })) || [],
                }
            },
            include: {
                permissions: true,
            }
        });
        return new User(createdUser.id, createdUser.email, createdUser.password);
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? new User(user.id, user.email, user.password) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? new User(user.id, user.email, user.password) : null;
    }

    async findAll(filter: ParsedUrlQuery): Promise<User[]> {
        const users = await prisma.user.findMany({ where: filter });
        return users
    }

    async edit(id: string, user: Partial<User>): Promise<User> {
        const updateData: Record<string, any> = {
            email: user.email,
            password: user.password,
            permissions: {
                connect: user.permissions?.map(permission => ({ id: permission.id }))
            }
        }

        return await prisma.user.update({
            where: { id },
            data: updateData
        });
    }

    async delete(id: string): Promise<User> {
        return await prisma.user.delete({ where: { id } });
    }
}

