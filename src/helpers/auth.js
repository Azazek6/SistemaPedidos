import bcrypt from "bcryptjs";
import md5 from "md5";

export const passwordEncrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
export const passwordVerify = async (password, savedPassword) => {
  try {
    let encryptPassword = md5(password);
    return await encryptPassword === savedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
