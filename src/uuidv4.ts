import { randomBytes } from 'node:crypto';

export default function uuidv4(): string {
  const bytes = randomBytes(16);

  // Переводим в UUID v4 по спецификации RFC4122:
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // версия 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10xxxxxx

  const hex = bytes.toString('hex');

  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20),
  ].join('-');
}
