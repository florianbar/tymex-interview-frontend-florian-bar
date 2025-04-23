import { User } from "@/types/users";
import { DEFAULT_LIMIT } from "@/constants/users";

export async function getUsers(
  id: string | null,
  name: string | null,
  email: string | null,
  page: string | null,
  limit: string | null
): Promise<User[]> {
  const users = await import("@/mock-data/users.json");
  let filteredUsers = users.users;

  if (id) {
    filteredUsers = filteredUsers.filter((user) => user.id === parseInt(id));
  }

  if (name) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (email) {
    filteredUsers = filteredUsers.filter((user) =>
      user.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  const pageNum = page ? parseInt(page) : 1;
  const limitNum = limit ? parseInt(limit) : DEFAULT_LIMIT;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  return filteredUsers.slice(startIndex, endIndex);
}
