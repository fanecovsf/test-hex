import { UserRepository } from "@/domain/ports/User.repository";
import { UpdateUserDTO, UserResponseDTO } from "@/application/dtos/User.dto";

export class EditUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
        const user = await this.userRepository.edit(id, data);
        return UserResponseDTO.fromDomain(user);
    }
}

