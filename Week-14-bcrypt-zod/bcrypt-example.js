const bcrypt = require("bcrypt");

(async () => {
  const password = "qwert@123";
  console.log("Original Password:", password);

  const hashedPassword = await bcrypt.hash(password, 10);
  // 10 is the salt rounds, which determines the computational cost of hashing
  // salt added every time we hash the same password,
  // it will produce a different hash,
  // making it more secure against rainbow table attacks.
  // salt is unique for each password and is stored as part of the hashed password.

  console.log("Hashed Password:", hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  // salt is stored in the hashed password
  // compare the original password with the hashed password
  // salt is extracted from the hashed password and
  // used to hash the input password for comparison

  console.log("Password Match:", isMatch);
})();
