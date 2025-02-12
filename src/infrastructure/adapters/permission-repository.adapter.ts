import prisma from "@/config/prisma";
import { Permission } from "@/domain/entities/Permission";
import { PermissionRepository } from "@/domain/ports/Permission.repository";


export class PrismaPermissionRepository implements PermissionRepository {
    async findAll(): Promise<Permission[]> {
        const permissions = await prisma.permission.findMany();
        return permissions
    }

    async findById(id: string): Promise<Permission | null> {
        const permission = await prisma.permission.findUnique({ where: { id } });
        return permission ? new Permission(permission.id, permission.name, permission.nickname) : null;
    }
}

