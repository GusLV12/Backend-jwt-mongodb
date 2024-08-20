import { Schema, model } from "mongoose";
import bCript from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bCript.genSalt(10);
  return await bCript.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedpassowrd) => {
  return await bCript.compare(password, receivedpassowrd);
};

export default model("User", userSchema);
