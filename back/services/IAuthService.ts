import { IUser } from "../models/User";

export interface IAuthService {
  register(user: IUser): Promise<{ message: string }>;
  login(username: string, password: string): Promise<{ message: string; token: string }>;
}
