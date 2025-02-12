import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";
import { PermissionNames } from "@/domain/enums/PermissionNames.enum";

export async function permissionSeed(): Promise<void> {
    const permissions: Array<Record<string, string>> = Object.entries(PermissionNames).map(([name, nickname]) => ({
        name,
        nickname
    }));

    permissions.forEach(async (obj) => {
        const existingPermission = await prisma.permission.findUnique({ where: { name: obj.name } });

        if (!existingPermission) {
            const data: Prisma.PermissionCreateInput = {
                name: obj.name,
                nickname: obj.nickname
            }

            await prisma.permission.create({ data });
        }
    })
}

