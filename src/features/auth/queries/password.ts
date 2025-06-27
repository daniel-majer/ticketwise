import { hash, verify } from "@node-rs/argon2";

/**
 * hash a password and verify a password against a hash
 * @param password
 * @returns
 */
export const hashPassword = async (password: string) => {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
};

export const verifyPasswordHash = async (hash: string, password: string) => {
  return await verify(hash, password);
};
