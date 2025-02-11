import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/ports/User.repository";
import { CreateUserDTO, UserResponseDTO } from "@/application/dtos/User.dto";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) throw new Error("Email já cadastrado");

        const user = User.create(data.email, data.password);
        const createdUser = await this.userRepository.create(user);

        return UserResponseDTO.fromDomain(createdUser);
    }
}
