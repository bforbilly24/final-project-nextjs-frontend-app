import { getServerSession } from 'next-auth';

export default async function session(req, res) {
  const session = await getServerSession(req);
  res.send({ session });
}
