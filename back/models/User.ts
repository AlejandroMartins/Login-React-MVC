import mongoose, { Document, Model, Schema } from "mongoose";

// Interface que representa um documento de usuário no MongoDB
export interface IUser extends Document {
  username: string;
  password: string;
}

// Schema do usuário
const UserSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Modelo do usuário
export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
