// src/models/user.model.js // standerd way to create a schema and model in mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from query results by default
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to hash password before saving the user document
// it runs before saving a user document to the database. It checks if the password field has been modified (i.e., if it's a new user or if the password has been updated). If the password has been modified, it hashes the password using bcrypt with a salt round of 10 and then saves the hashed password to the database.
// Means it converts the password into a hash before saving it to the database,
// enhancing security by ensuring that the actual password is not stored in plain text.
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next(); // If the password field is not modified, skip hashing and proceed to save the user document. This prevents re-hashing an already hashed password when updating other fields of the user document.
  // Hash the password before saving
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next(); // Proceed to save the user document after hashing the password
  });
});

// Method to compare provided password with the hashed password in the database
// This method attached to userSchema allows you to compare a plain text password with the hashed password stored in the database.
// use as const isMatch = await user.comparePassword(providedPassword);
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
