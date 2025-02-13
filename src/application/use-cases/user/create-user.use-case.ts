import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/User.repository";
import { CreateUserDTO, UserResponseDTO } from "@/application/dtos/User.dto";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
        const createdUser = await this.userRepository.create(data);

        return UserResponseDTO.fromDomain(createdUser);
    }
}
