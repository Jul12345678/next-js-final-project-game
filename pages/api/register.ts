import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../util/database';

export default async function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
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
