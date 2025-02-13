import prisma from "@/config/prisma";

export async function operationSeed(): Promise<void> {
    const existingOperation = await prisma.operation.findUnique({ where: { name: "ADMIN" } })

    if (!existingOperation) {
        await prisma.operation.create({ data: { name: "ADMIN" } })
    }
}
