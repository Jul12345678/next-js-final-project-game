import { NextApiRequest, NextApiResponse } from 'next';

export default function registerHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    console.log(request.body);
    response.json({ a: 'b' });
    return;
  }
  response.status(405).json({
    error: [{ message: 'Method not supported, try POST instead' }],
  });
}
