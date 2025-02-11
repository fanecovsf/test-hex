import { UserRepository } from "@/domain/ports/User.repository";
import { UserResponseDTO } from "@/application/dtos/User.dto";

export class GetUserByEmailUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string): Promise<UserResponseDTO | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("Usuário não encontrado");
        return UserResponseDTO.fromDomain(user)
    }
}
