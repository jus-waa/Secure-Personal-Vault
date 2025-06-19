import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET_KEY; // Must be 32 bytes
const ivLength = 16; // AES block size

export function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    content: encrypted,
  };
}

export function decrypt(encryptedObj) {
  const iv = Buffer.from(encryptedObj.iv, "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedObj.content, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

