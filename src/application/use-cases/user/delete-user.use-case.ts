import { UserRepository } from "@/domain/ports/User.repository";
import { UserResponseDTO } from "@/application/dtos/User.dto";

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {};

    async execute(id: string): Promise<UserResponseDTO> {
        return await this.userRepository.delete(id);
    }
}

