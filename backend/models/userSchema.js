import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const MAX_TOKENS = 5; // Define the maximum number of tokens to store.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      type: String,
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);

  // Add the new token to the beginning of the 'tokens' array.
  this.tokens.unshift(token);

  // Ensure that 'tokens' does not exceed the maximum allowed length.
  if (this.tokens.length > MAX_TOKENS) {
    this.tokens.pop(); // Remove the oldest token from the end of the array.
  }

  await this.save();
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
