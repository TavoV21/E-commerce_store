import bcrypt from "bcryptjs";

export const encrypt = async (textplain) => {
  const hash = await bcrypt.hash(textplain, 10);
  return hash;
};

export const compare = async (passwordplain, passwordhash) => {
  return await bcrypt.compare(passwordplain, passwordhash);
};
