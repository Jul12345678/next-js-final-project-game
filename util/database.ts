import camelCaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

//
config();

type User = {
  id: number;
  username: string;
};
const sql = postgres();
export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
    INSERT INTO users (username, password_hash)
    VALUES (${username}, ${passwordHash})
    RETURNING
      id,
      username
  `;
  return camelCaseKeys(user);
}
