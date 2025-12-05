  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const blacklistedTokenSchema = new Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true}, // Expires in 1 hour
  });

  module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema, "blacklistedTokens");