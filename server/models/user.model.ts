import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  lastLogin?: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken: string;
  verificationTokenExpiresAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please use a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password by default
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^\+?[0-9\- ]{7,15}$/, "Please use a valid phone number"],
    },
    address: {
      type: String,
      default: "Update your address",
      trim: true,
    },
    city: {
      type: String,
      default: "Update your city",
      trim: true,
    },
    country: {
      type: String,
      default: "Update your country",
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "",
      validate: {
        validator: (url: string) => url === "" || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url),
        message: "Profile picture must be a valid image URL",
      },
    },
    admin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: {
      type: String,
      required: true,
    },
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare passwords
userSchema.methods.matchPassword = function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Virtual for full address
userSchema.virtual("fullAddress").get(function () {
  return `${this.address}, ${this.city}, ${this.country}`;
});

export default mongoose.model<IUserDocument>("User", userSchema);
