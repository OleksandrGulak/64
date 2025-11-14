import bcrypt from 'bcrypt';

const users = [];

export async function createUser(email, password) {
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, password: hashed };
  users.push(user);
  return user;
}

export default users;