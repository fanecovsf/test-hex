import { User } from "../entities/User"
import { ParsedUrlQuery } from "querystring";
import { AddPermissionDTO } from "@/application/dtos/Permission.dto";

export interface UserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(filter: ParsedUrlQuery): Promise<User[]>;
    edit(id: string, user: Partial<User>, permissions: AddPermissionDTO | undefined): Promise<User>;
    delete(id: string): Promise<User>;
}