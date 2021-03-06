import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, getUserByUsername } from '../../util/database';

export default async function registerHandler(
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
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [
          {
            message: 'Username already exists',
          },
        ],
      });
      return;
    }
    console.log(request.body);
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    const user = await createUser(request.body.username, passwordHash);

    response.status(201).json({ user: user });
    return;
  }
  response.status(405).json({
    error: [{ message: 'Method not supported, try POST instead' }],
  });
}
