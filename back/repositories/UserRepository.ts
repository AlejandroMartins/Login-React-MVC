import IUserRepository from "./IUserRepository";
import { IUser, User } from "../models/User";

export class UserRepository implements IUserRepository {
  constructor() {
    // construtor vazio, pode ser removido se não fizer nada
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username });
  }

  async create(userData: IUser): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }
}
