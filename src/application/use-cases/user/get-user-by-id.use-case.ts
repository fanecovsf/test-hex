import { UserRepository } from "@/domain/ports/User.repository";
import { UserResponseDTO } from "@/application/dtos/User.dto";

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<UserResponseDTO | null> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new Error("Usuário não encontrado");
        return UserResponseDTO.fromDomain(user)
    }
}
