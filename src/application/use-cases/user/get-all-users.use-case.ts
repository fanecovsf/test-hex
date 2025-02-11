import { UserRepository } from "@/domain/ports/User.repository";
import { UserResponseDTO } from "@/application/dtos/User.dto";
import { ParsedUrlQuery } from "querystring";

export class GetAllUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(filter: ParsedUrlQuery): Promise<UserResponseDTO[]> {
        const users = await this.userRepository.findAll(filter);
        return users.map(UserResponseDTO.fromDomain);
    }
}
