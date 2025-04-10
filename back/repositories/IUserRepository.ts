import { Document } from "mongoose";
import { IUser } from "../models/User";

interface IUserRepository {
  findByUsername(username: string): Promise<IUser | null>;
  create(userData: IUser): Promise<IUser & Document>;
}

export default IUserRepository;
