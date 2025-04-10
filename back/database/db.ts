import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error("MONGO_URI não está definida!");

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB conectado!");
  } catch (error: any) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
