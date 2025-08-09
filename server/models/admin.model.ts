import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin {
  username: string;
  password: string;
}

export interface IAdminDocument extends IAdmin, Document {
  createdAt: Date;
  updatedAt: Date;
  matchPassword(entered: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdminDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
  },
  { timestamps: true }
);

// Hash admin password
adminSchema.pre<IAdminDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
adminSchema.methods.matchPassword = function (entered: string) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model<IAdminDocument>("Admin", adminSchema);
