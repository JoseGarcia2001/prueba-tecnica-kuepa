const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  const userReference = this;
  if (this.isNew || this.isModified("password")) {
    bcrypt.hash(userReference.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        userReference.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.isCorrectPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, same);
    }
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
