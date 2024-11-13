import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['mentor', 'mentee'],
      required: true,
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash password on new or modified passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Pre-update middleware to hash password if it's modified in an update operation
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  
  // Check if password is being updated
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  next();
});

// Method to check if the provided password matches the hashed password
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, role: this.role };

  const expiresIn = process.env.ACCESS_TOKEN_EXPIRY || '1d';

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn,
  });

  return accessToken;
};

const User = mongoose.model('User', userSchema);

export default User;
