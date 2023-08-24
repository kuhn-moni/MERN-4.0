import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  console.log(password);
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Error: ", error);
  }
};
