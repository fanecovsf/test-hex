import { UserRepository } from "@/domain/ports/User.repository";
import { UpdateUserDTO, UserResponseDTO } from "@/application/dtos/User.dto";
import { AddPermissionDTO } from "@/application/dtos/Permission.dto";

export class EditUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, data: UpdateUserDTO, permissions: AddPermissionDTO | undefined): Promise<UserResponseDTO> {
        const user = await this.userRepository.edit(id, data, permissions);
        return UserResponseDTO.fromDomain(user);
    }
}

