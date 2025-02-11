import { CreateUserUseCase } from "@/application/use-cases/user/create-user.use-case";
import { GetUserByEmailUseCase } from "@/application/use-cases/user/get-user-by-email.use-case";
import { GetUserByIdUseCase } from "@/application/use-cases/user/get-user-by-id.use-case";
import { UserRepository } from "@/domain/ports/User.repository";
import { CreateUserDTO, UserResponseDTO } from "@/application/dtos/User.dto";

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
        const createUserUseCase = new CreateUserUseCase(this.userRepository);
        return await createUserUseCase.execute(data);
    }

    async getUserById(id: string): Promise<UserResponseDTO | null> {
        const getUserByIdUseCase = new GetUserByIdUseCase(this.userRepository);
        return await getUserByIdUseCase.execute(id);
    }

    async getUserByEmail(email: string): Promise<UserResponseDTO | null> {
        const getUserByEmailUseCase = new GetUserByEmailUseCase(this.userRepository);
        return await getUserByEmailUseCase.execute(email);
    }
}
