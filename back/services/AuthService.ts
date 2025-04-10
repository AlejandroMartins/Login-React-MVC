import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IAuthService } from "./IAuthService";
import IUserRepository from "../repositories/IUserRepository";
import { IUser } from "../models/User";

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(user: IUser): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findByUsername(user.username);
    if (existingUser) throw new Error("Usuário já cadastrado!");

    user.password = await bcrypt.hash(user.password, 10);
    await this.userRepository.create(user);

    return { message: "Usuário criado com sucesso!" };
  }

  async login(username: string, password: string): Promise<{ message: string; token: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error("Usuário não encontrado!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Senha incorreta!");

    const token = jwt.sign({ id: user._id }, "secreto", { expiresIn: "1h" });

    return { message: "Logado com sucesso!", token };
  }
}
