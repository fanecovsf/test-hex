import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/User.repository";
import { CreateUserDTO, UserResponseDTO } from "@/application/dtos/User.dto";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
        const user = User.create(data.email, data.password);
        const userDto = new CreateUserDTO(user.email, user.password, data.permissions);
        const createdUser = await this.userRepository.create(userDto);

        return UserResponseDTO.fromDomain(createdUser);
    }
}
