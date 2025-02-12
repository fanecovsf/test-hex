import { Permission } from "../entities/Permission";

export interface PermissionRepository {
    findById(id: string): Promise<Permission | null>;
    findAll(): Promise<Permission[]>;
}
