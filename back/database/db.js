const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error("MONGO_URI não está definida!");

    // Remova os parâmetros depreciados
    await mongoose.connect(mongoURI);  // Sem useNewUrlParser e useUnifiedTopology

    console.log("✅ MongoDB conectado!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
