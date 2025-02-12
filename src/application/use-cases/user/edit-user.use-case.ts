import { UserRepository } from "@/domain/ports/User.repository";
import { UpdateUserDTO, UserResponseDTO } from "@/application/dtos/User.dto";

export class EditUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, data: UpdateUserDTO, permissions: string[]): Promise<UserResponseDTO> {
        const user = await this.userRepository.edit(id, data, permissions);
        return UserResponseDTO.fromDomain(user);
    }
}

