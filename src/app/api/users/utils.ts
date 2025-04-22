interface User {
  id: number;
  name: string;
  email: string;
}

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

  if (page && limit) {
    filteredUsers = filteredUsers.slice(
      (parseInt(page) - 1) * parseInt(limit),
      parseInt(page) * parseInt(limit)
    );
  }

  return filteredUsers;
}
