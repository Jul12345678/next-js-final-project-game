import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createUser,
  getUserByUsername,
  getUserWithPasswordHashByUsername,
} from '../../util/database';

export default async function loginHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username or password not provided',
          },
        ],
      });
      return;
    }
    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      request.body.username,
    );
    if (!userWithPasswordHash) {
      response.status(401).json({
        errors: [
          {
            message: 'Username not found',
          },
        ],
      });
      return;
    }

    const passwordMatches = await bcrypt.compare(
      request.body.password,
      userWithPasswordHash.passwordHash,
    );
    if (!passwordMatches) {
      response.status(401).json({
        errors: [
          {
            message: "Password doesn't match",
          },
        ],
      });
      return;
    }
    // todo return created session
    response.status(201).json({ user: { id: userWithPasswordHash.id } });
    return;
  }
  response.status(405).json({
    error: [{ message: 'Method not supported, try POST instead' }],
  });
}
